import { useState } from "react";
import { Button, Input, Box, Center, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, FormControl, FormLabel, Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { postdata } from "../Redux/Admin/actions";
import AdminProdduct from "./Adminproductdata";

const initialdata = {
  name: "",
  desc: "",
  image: "",
  price: "",
  rating: ""
};

export const AdminPage = () => {
  const [ren, setRen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState(initialdata);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.admin.isLoading);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { desc, image, price, name, rating } = data;
    if (desc && image && price && name && rating) {
      dispatch(postdata(data, setRen));
      setData(initialdata);
      onClose();
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div>
      <div style={{ backgroundColor: "#FAFAFA", marginTop: "5px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "20px" }}>
          <h1 style={{ fontSize: "20px", color: "green" }}>Hello Admin</h1>
          <Button colorScheme="green" onClick={onOpen}>
            Add New Product
          </Button>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", margin: "30px" }}>
          <div style={{ padding: "10px", boxShadow: "0px 5px 5px 0px red", height: "60px", width: "300px" }}>
            <h3>EARNINGS (MONTHLY)</h3>
            <h3>Rs. 4,00,000</h3>
          </div>

          <div style={{ padding: "10px", boxShadow: "0px 5px 5px 0px green", height: "60px", width: "300px" }}>
            <h3>EARNINGS (ANNUAL)</h3>
            <h3>Rs. 2,15,000,000</h3>
          </div>

          <div style={{ padding: "10px", boxShadow: "0px 5px 5px 0px blue", height: "60px", width: "300px" }}>
            <h3>TASKS</h3>
            <h3>50%</h3>
          </div>

          <div style={{ padding: "10px", boxShadow: "0px 5px 5px 0px yellow", height: "60px", width: "300px" }}>
            <h3>PENDING REQUESTS</h3>
            <h3>18</h3>
          </div>
        </div>

        <AdminProdduct setRen={setRen} ren={ren} />

        {/* Modal for Add Product */}
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Product</ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit}>
                <Flex gap="10px">
                  <FormControl>
                    <FormLabel>Image URL</FormLabel>
                    <Input name="image" value={data.image} onChange={handleChange} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input name="name" value={data.name} onChange={handleChange} />
                  </FormControl>
                </Flex>

                <Flex gap="10px" mt="4">
                  <FormControl>
                    <FormLabel>Rating</FormLabel>
                    <Input type="number" name="rating" value={data.rating} onChange={handleChange} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Input name="desc" value={data.desc} onChange={handleChange} />
                  </FormControl>
                </Flex>

                <FormControl mt="4">
                  <FormLabel>Price</FormLabel>
                  <Input type="number" name="price" value={data.price} onChange={handleChange} />
                </FormControl>

                <ModalFooter>
                  <Button type="submit" colorScheme="green" isLoading={isLoading}>
                    Add Product
                  </Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};
