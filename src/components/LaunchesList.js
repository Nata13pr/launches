import { useState } from "react";
import Modal from "./Modal/Modal";

export default function LaunchesList({ launches }) {
  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState([]);

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const handlerOnClick = (item) => {
    setDetails(item.name);
  };

  return (
    <div>
      {showModal && (
        <Modal onClose={toggleModal}>
          {details ? details : "No details available"}
        </Modal>
      )}
      {launches && launches.map((launch) => {
        const date = new Date(launch.date_unix);

        return (
          <ul key={launch.id}>
            <li onClick={() => handlerOnClick(launch)}>
              <div onClick={toggleModal}>   <img
                src={launch.links.patch.small}
                alt={launch.name}
                
              />
              <div>Name: {launch.name}</div>
              <div>Flight Number: {launch.flight_number}</div>
              <div>Data: {date.toLocaleDateString()}</div></div>
           
            </li>
          </ul>
        );
      })}
    </div>
  );
}
