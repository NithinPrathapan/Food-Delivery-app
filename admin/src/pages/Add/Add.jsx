import React from "react";
import { assets } from "../../assets/assets";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    const response = await axios.post(`${url}/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(null);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    const name = [e.target.name];
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  return (
    <div className="sm:w-[70%] w-[80%] ml-[5vw] sm:mt-[50px] mt-4  text-[#6d6d6d] text-[16px] text-sm ">
      <form action="" onSubmit={onSubmitHandler} className="flex-col">
        <div className="image">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              className="w-[120px] cursor-pointer"
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="upload area"
            />
          </label>
          <input
            className="w-[120px] cursor-pointer"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
            hidden
            id="image"
            required
          />
        </div>
        <div className="max-w-[40%]">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            className="outline-none border-2 min-w-full rounded-md  p-[10px] "
            type="text"
            name="name"
            required
            placeholder="Type here"
          />
        </div>
        <div className=" rounded-md  max-w-[80%]">
          <p className="min-w-full">Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            className="p-[10px] outline-none border-2 min-w-full "
            type="text"
            name="description"
            placeholder="Write content"
            rows="6"
            required
          ></textarea>
        </div>
        <div className="sm:flex  gap-4 items-center mr-4">
          <div className="flex flex-col ">
            <p>Product Category</p>
            <select
              onChange={onChangeHandler}
              className="border-2 outline-none rounded-md p-2"
              name="category"
              id=""
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="flex flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              className="border-2 p-2 outline-none rounded-md"
              type="Number"
              name="price"
              placeholder="$ 20"
              id=""
              required
            />
          </div>
        </div>
        <button
          className="max-w-[150px] bg-black px-6 py-2 text-white font-semibold rounded-md mt-4 mb-2"
          type="submit"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;