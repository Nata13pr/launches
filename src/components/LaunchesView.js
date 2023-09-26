import { useState } from "react";
import { useSelector } from "react-redux";
import Filter from "./Filter";
import LaunchList from "./LaunchesList";
import Modal from "./Modal/Modal";

export default function LaunchesView({ launches }) {
  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState([]);
    const [name, setName] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [date, setDate] = useState("");
    const lanches = useSelector((state) => state.launches.lanches);

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const handlerOnClick = (item) => {
    setDetails(item);
  };

  const handleChangeFIlter = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "name":
        setName(value);
        break;

      case "flightNumber":
        setFlightNumber(value);
        break;

      case "date":
        setDate(value);
        break;

      default:
        return;
    }
  };
    const filtredByName = (lanches) => {
    return lanches.filter((launch) => {
      return launch.name.toLowerCase().includes(name.toLowerCase().trim());
    });
  };

  const filtredByFlightNumber = (lanches) => {
    if (flightNumber === "") {
      return lanches;
    }

    return lanches.filter((launch) => {
      return launch.flight_number === Number(flightNumber);
    });
  };

  const filtredByDate = (launches) => {
    return launches.filter((launch) => {
      const newDate = new Date(launch.date_unix);

      return newDate.toLocaleDateString().includes(date.toLowerCase().trim());
    });
  };
  const launchesFilteredByName = filtredByName(lanches);
  const launchesFilteredByFlightNumber = filtredByFlightNumber(
    launchesFilteredByName
  );
  const launchesFilteredByDate = filtredByDate(launchesFilteredByFlightNumber);

  return (
    <div>
      <Filter name='name' value={name} title='Name' onChange={handleChangeFIlter}/>
      <Filter name='flightNumber' value={flightNumber} title=' Flight Number' onChange={handleChangeFIlter}/>
      <Filter  name='data' value={date} title='Date' onChange={handleChangeFIlter}/>

      {showModal && (
        <Modal onClose={toggleModal}>
          {details ? details : "No details available"}
        </Modal>
      )}
      <LaunchList  handlerOnClick={handlerOnClick} toggleModal={toggleModal} launches={launchesFilteredByDate}/>
      {/* {launchesFilteredByDate && launchesFilteredByDate. */}
    </div>
  );
}
