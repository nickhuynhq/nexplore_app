import axios from "axios";
import { RAPIDAPI_API_KEY } from "@env";
import { coordinatesInterface } from "../types/types";

interface getPlacesDataProps {
  coordinates: coordinatesInterface,
  menuSelection: string
}

export const getPlacesData = async ({coordinates, menuSelection}: getPlacesDataProps) => {
  try {
    const { data: { data }, } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${menuSelection}/list-in-boundary`,
      {
        params: {
          bl_latitude: coordinates.bl.lat,
          tr_latitude: coordinates.tr.lat,
          bl_longitude: coordinates.bl.long,
          tr_longitude: coordinates.tr.long,
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

    console.log("Data:",data)
    
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
