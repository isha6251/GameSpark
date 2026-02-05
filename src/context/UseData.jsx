import { useContext } from "react";
import { DataContext } from "./DataContextInstance";

export const useData = () => useContext(DataContext);
