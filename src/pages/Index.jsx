import React, { useState } from "react";
import { Box, Button, Image, Input, VStack, Text, useToast } from "@chakra-ui/react";
import { FaUpload } from "react-icons/fa";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const toast = useToast();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
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
      <Box>
        <Input type="file" accept="image/*" onChange={handleImageChange} hidden id="file-upload" />
        <Button leftIcon={<FaUpload />} onClick={() => document.getElementById("file-upload").click()}>
          Choose Image
        </Button>
      </Box>
      {selectedImage && (
        <Box boxSize="sm">
          <Image src={selectedImage} alt="Selected" />
        </Box>
      )}
      <Button colorScheme="blue" onClick={handleUpload} isDisabled={!selectedImage}>
        Upload Image
      </Button>
    </VStack>
  );
};

export default Index;
