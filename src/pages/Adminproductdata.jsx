import {
  Box, Button, Center, Img, Spinner, Grid, VStack, Modal, ModalOverlay,
  ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  useDisclosure, Input, FormControl, FormLabel, HStack
} from "@chakra-ui/react";
import { useState, useReducer, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deletedata, updatedata } from "../Redux/Admin/actions";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'REQUEST_MADE': return { ...state, isLoading: true };
    case 'REQUEST_SUCESS': return { ...state, isLoading: false, data: payload };
    case 'REQUEST_ERROR': return { ...state, isLoading: false };
    default: return state;
  }
};

function AdminProdduct({ setRen, ren }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [rendor, setRendor] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const reduxDispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isUpdating = useSelector((state) => state.update.isLoading);

  const getData = async (url) => {
    try {
      dispatch({ type: 'REQUEST_MADE' });
      let res = await axios(url);
      dispatch({ type: 'REQUEST_SUCESS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'REQUEST_ERROR' });
    }
  };

  useEffect(() => {
    const url = `https://buy-now-be.onrender.com/products`;
    getData(url);
  }, [rendor, ren]);

  const handleDelete = async (_id) => {
    if (_id) {
      reduxDispatch(deletedata(_id, setRen));
      setRen(true);
    } else {
      alert("Ohh! you are not providing complete data");
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    onOpen();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const { _id, desc, image, name, rating, price } = selectedProduct;

    if (_id && desc && image && name && rating && price) {
      reduxDispatch(updatedata(_id, selectedProduct, setRendor));
      onClose();
    } else {
      alert("Ohh! you are not providing complete data");
    }
  };

  return (
    <div>
      {state.isLoading ? (
        <Center>
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Center>
      ) : (
        <Grid
          gap={6}
          templateColumns="repeat(auto-fill, minmax(230px, 1fr))"
          px={6}
          mt={6}
        >
          {state?.data?.products?.map((el) => (
            <Box
              key={el._id}
              p={4}
              boxShadow="md"
              borderRadius="md"
              border="1px solid #e2e8f0"
              _hover={{ boxShadow: "lg", transform: "translateY(-4px)", transition: "all 0.3s ease-in-out" }}
              bg="white"
              textAlign="center"
            >
              <Img
                src={el.image}
                alt={el.name}
                height="180px"
                objectFit="fill"
                w="100%"
                borderRadius="md"
                mb={3}
              />
              <Box fontWeight="bold" fontSize="lg" mb={1}>{el.name}</Box>
              <Box fontSize="sm" color="gray.600" mb={1}>{el.desc}</Box>
              <Box fontSize="sm">⭐ {el.rating}</Box>
              <Box fontSize="md" fontWeight="semibold" color="green.600">₹ {el.price}</Box>
              <HStack justify="center" mt={4}>
                <Button onClick={() => handleDelete(el._id)} colorScheme="red" size="sm">
                  Delete
                </Button>
                <Button onClick={() => handleEdit(el)} colorScheme="green" size="sm">
                  Edit
                </Button>
              </HStack>
            </Box>
          ))}
        </Grid>
      )}

      {/* Edit Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent borderRadius="lg">
          <ModalHeader fontWeight="bold" color="green.600">Edit Product</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleUpdate}>
            <ModalBody pb={6}>
              {selectedProduct && (
                <VStack spacing={4} align="stretch">
                  <HStack spacing={4}>
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input
                        name="name"
                        value={selectedProduct.name}
                        onChange={handleInputChange}
                        placeholder="Enter product name"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Price</FormLabel>
                      <Input
                        name="price"
                        value={selectedProduct.price}
                        onChange={handleInputChange}
                        placeholder="Enter price"
                        type="number"
                      />
                    </FormControl>
                  </HStack>

                  <HStack spacing={4}>
                    <FormControl>
                      <FormLabel>Description</FormLabel>
                      <Input
                        name="desc"
                        value={selectedProduct.desc}
                        onChange={handleInputChange}
                        placeholder="Enter product description"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Rating</FormLabel>
                      <Input
                        name="rating"
                        value={selectedProduct.rating}
                        onChange={handleInputChange}
                        placeholder="Enter rating"
                        type="number"
                      />
                    </FormControl>
                  </HStack>

                  <FormControl>
                    <FormLabel>Image URL</FormLabel>
                    <Input
                      name="image"
                      value={selectedProduct.image}
                      onChange={handleInputChange}
                      placeholder="Enter image URL"
                    />
                  </FormControl>
                </VStack>
              )}
            </ModalBody>

            <ModalFooter>
              {!isUpdating ? (
                <Button colorScheme="green" mr={3} type="submit">
                  Save
                </Button>
              ) : (
                <Button
                  isLoading
                  loadingText="Saving..."
                  colorScheme="green"
                  variant="outline"
                  mr={3}
                >
                  Save
                </Button>
              )}
              <Button onClick={onClose} colorScheme="gray">Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AdminProdduct;
