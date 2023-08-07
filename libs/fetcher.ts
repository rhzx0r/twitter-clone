import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data); // TODo Revisar esto despues puede ser el causante de las multiples llamadas

export default fetcher;