import axios from "axios";
import $ from 'jquery'

const CarService = {

    fetchCarData: (url) => {
        return axios.get(url);
    },

};

export default CarService