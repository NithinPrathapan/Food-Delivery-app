import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import ExploreMenu from "../../Components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../Components/FoodDisplay/FoodDisplay";
import AppDownload from "../../Components/AppDownload/AppDownload";
import { useDispatch } from "react-redux";
import { listAllItems } from "../../Redux/itemSlice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllFooodItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/food");
        dispatch(listAllItems(response.data.data));
      } catch (error) {
        alert(error.message);
      }
    };
  }, []);

  const [category, setCategory] = useState("All");
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
};

export default Home;
