import axios from "axios";
import { RAPIDAPI_API_KEY } from "@env";
import { coordinatesInterface } from "../types/types";

export const getPlacesData = async (coordinates : coordinatesInterface) => {
  try {
    const { data: { data }, } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary`,
      {
        params: {
          bl_latitude: coordinates ? coordinates.bl.lat : "11.847676",
          tr_latitude: coordinates ? coordinates.tr.lat : "12.838442",
          bl_longitude: coordinates ? coordinates.bl.long : "109.095887",
          tr_longitude: coordinates ? coordinates.tr.long : "109.149359",
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
