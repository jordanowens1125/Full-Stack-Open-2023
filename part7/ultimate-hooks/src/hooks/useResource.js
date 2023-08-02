import { useEffect, useState } from "react";
import axios from "axios";

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const create = (resource) => {
    axios
      .post(baseUrl, resource)
      .then((res) => setResources(resources.concat(res.data)));
  };
  useEffect(() => {
    const getAll = () => {
      if (baseUrl) {
        axios.get(baseUrl).then((res) => setResources(res.data));
      }
    };
    getAll();
  }, [setResources, baseUrl]);

  const service = {
    create,
  };

  return [resources, service];
};

export default useResource;
