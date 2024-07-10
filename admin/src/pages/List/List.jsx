import React from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    const response = await axios.get(`${url}`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("failed to fetch list");
    }
  };
  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async (id) => {
    try {
      const response = await axios.delete(`${url}/${id}`);
      toast.success("Deleted successfully");
      await fetchList();
    } catch (error) {
      console.log(error.message);
      toast.error("failed to delete");
    }
  };

  return (
    <div className="sm:w-[70%] w-[80%] mt-4 sm:ml-[5vw] sm:mt-[50px]  text-[#6d6d6d] sm:text-[18px] text-[12px] ">
      <p className="text-xl my-2 text-center font-semibold"> All Food List</p>
      <div>
        <div className="hidden  text-center sm:grid grid-cols-5 gap-4 items-center py-2 px-4 text-[14px] bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={item._id}>
              <div className="grid grid-cols-5 sm:gap-4 gap-2 text-center text-xs items-center py-2 px-4 ">
                <img
                  className="w-[50px] mx-auto"
                  src={`${url}/images/` + item.image}
                  alt="item"
                />
                <p>{item.name}</p>
                <p>$ {item.price}</p>
                <p>{item.category}</p>
                <p
                  onClick={() => {
                    removeFood(item._id);
                  }}
                  className="text-xl text-red-500 font-bold cursor-pointer"
                >
                  x
                </p>
              </div>
              <hr className="bg-gray-500 rounded-full my-2  ring-[0.2px] border-none mx-6 ring-black" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
