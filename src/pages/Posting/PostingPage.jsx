import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Input,
  Textarea,
  Checkbox,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "antd";

export default function PostingPage() {
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    category: "",
    price: "",
    photos: [],
    pickupLocation: "",
    deliveryMethods: [],
    email: "default@email.com", // pre-filled from profile
    phone: "123-456-7890", // pre-filled from profile
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 6);
    setFormData({ ...formData, photos: files });
  };

  const handleDeliveryToggle = (method) => {
    setFormData((prev) => {
      const exists = prev.deliveryMethods.includes(method);
      return {
        ...prev,
        deliveryMethods: exists
          ? prev.deliveryMethods.filter((m) => m !== method)
          : [...prev.deliveryMethods, method],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Post uploaded!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-3xl shadow-lg rounded-2xl p-6">
        <CardContent>
          <h2 className="text-2xl font-bold mb-6 text-center">Create a Post</h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Left side */}
            <div className="space-y-4">
              <Input
                placeholder="Item name"
                value={formData.itemName}
                onChange={(e) =>
                  setFormData({ ...formData, itemName: e.target.value })
                }
              />
              <Textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="furniture">Furniture</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Price (USD)"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
              <p className="text-xs text-gray-500">Max 6 photos allowed</p>
            </div>

            {/* Right side */}
            <div className="space-y-4">
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, pickupLocation: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pickup location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="location1">Location 1</SelectItem>
                  <SelectItem value="location2">Location 2</SelectItem>
                  <SelectItem value="location3">Location 3</SelectItem>
                </SelectContent>
              </Select>

              <div>
                <label className="block mb-2 font-medium">
                  Delivery Method
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.deliveryMethods.includes("meetup")}
                      onCheckedChange={() => handleDeliveryToggle("meetup")}
                    />
                    <span>Meet-up</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.deliveryMethods.includes("delivery")}
                      onCheckedChange={() => handleDeliveryToggle("delivery")}
                    />
                    <span>Delivery</span>
                  </label>
                </div>
              </div>

              <Input
                type="email"
                placeholder="Default email from profile"
                value={formData.email}
                readOnly
              />
              <Input
                type="tel"
                placeholder="Default number from profile"
                value={formData.phone}
                readOnly
              />
            </div>

            {/* Submit */}
            <div className="col-span-1 md:col-span-2 flex justify-center mt-6">
              <Button type="submit" className="w-40 rounded-xl shadow-md">
                Upload Post
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
