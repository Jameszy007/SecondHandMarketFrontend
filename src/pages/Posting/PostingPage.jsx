import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PostingPage() {
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    category: "",
    condition: "",
    price: "",
    originalPrice: "",
    photos: [],
    pickupLocation: "",
    deliveryMethods: [],
    email: "default@email.com", // from profile
    phone: "123-456-7890", // from profile
    tags: [],
    newTag: "",
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

  const handleAddTag = () => {
    if (formData.newTag.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: "",
      }));
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
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
            {/* Left column */}
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

              {/* Condition */}
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, condition: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="like-new">Like New</SelectItem>
                  <SelectItem value="used">Used</SelectItem>
                </SelectContent>
              </Select>

              {/* Prices */}
              <Input
                type="number"
                placeholder="Price (USD)"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Original Price (USD)"
                value={formData.originalPrice}
                onChange={(e) =>
                  setFormData({ ...formData, originalPrice: e.target.value })
                }
              />

              {/* Photos */}
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
              <p className="text-xs text-gray-500">Max 6 photos allowed</p>
            </div>

            {/* Right column */}
            <div className="space-y-4">
              {/* Location */}
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, pickupLocation: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pickup location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newyork">New York</SelectItem>
                  <SelectItem value="losangeles">Los Angeles</SelectItem>
                  <SelectItem value="chicago">Chicago</SelectItem>
                </SelectContent>
              </Select>

              {/* Delivery Method */}
              <div>
                <label className="block mb-2 font-medium">Delivery Method</label>
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

              {/* Contact */}
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

              {/* Tags */}
              <div>
                <label className="block mb-2 font-medium">Tags</label>
                <div className="flex space-x-2 mb-2">
                  <Input
                    placeholder="Add a tag"
                    value={formData.newTag}
                    onChange={(e) =>
                      setFormData({ ...formData, newTag: e.target.value })
                    }
                  />
                  <Button
                    type="button"
                    onClick={handleAddTag}
                    className="rounded-lg"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 text-red-500"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>
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
