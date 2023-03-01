import axios from "axios";
import { RAPIDAPI_API_KEY } from "@env";
import { coordinatesInterface } from "../types/types";

export const getPlacesData = async (coordinates : coordinatesInterface) => {
  try {
    const { data: { data }, } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary`,
      {
        params: {
          bl_latitude: coordinates.bl.lat,
          tr_latitude: coordinates.tr.lat,
          bl_longitude: coordinates.bl.long,
          tr_longitude: coordinates.tr.long,
          restaurant_tagcategory_standalone: "10591",
          restaurant_tagcategory: "10591",
          limit: "30",
          currency: "USD",
          open_now: "false",
          lunit: "km",
          lang: "en_US",
        },
        headers: {
          "X-RapidAPI-Key": `${RAPIDAPI_API_KEY}`,
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
