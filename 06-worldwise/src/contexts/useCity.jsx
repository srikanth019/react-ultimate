import { useContext } from "react";
import { CitiesContext } from "./CitiesContext";

export function useCities () {
    return useContext(CitiesContext)
}
