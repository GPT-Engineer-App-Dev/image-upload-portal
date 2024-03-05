import React, { useState } from "react";
import { Box, Button, Input, InputGroup, InputLeftElement, VStack, Text, useToast } from "@chakra-ui/react";
import { FaUpload } from "react-icons/fa";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const toast = useToast();

  const [text, setText] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setText((prevText) => prevText + "\n" + reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    // This function would handle the actual upload process to a server
    toast({
      title: "Image uploaded successfully!",
      description: "We've received your image.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={4} p={8}>
      <Text fontSize="2xl" fontWeight="bold">
        Image Upload
      </Text>
      <Box mb={4} p={4} border="1px" borderColor="gray.200" borderRadius="md" resize="vertical" overflow="auto" minH="200px" maxH="600px">
        <Input type="text" placeholder="Enter some text..." value={text} onChange={(e) => setText(e.target.value)} size="lg" mb={4} />
        <Button h="1.75rem" size="sm" leftIcon={<FaUpload />} onClick={() => document.getElementById("file-upload").click()}>
          Choose Image
        </Button>
        <input style={{ display: "none" }} type="file" accept="image/*" onChange={handleImageChange} id="file-upload" />
        {selectedImage && <Image src={selectedImage} alt="Selected" maxW="full" mt={4} />}
      </Box>
      <Button colorScheme="blue" onClick={handleUpload} isDisabled={!selectedImage}>
        Upload Image
      </Button>
    </VStack>
  );
};

export default Index;
