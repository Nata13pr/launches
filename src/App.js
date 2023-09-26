// import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LaunchesView from "./components/LaunchesView";
import { useGetLaunchesByNameQuery } from "./redux/LaunchesAPI";
import { addLanches, setPage, setTotalPage } from "./redux/launchesSlice";

export default function App() {
  // const { data, error, isLoading } = useGetLaunchesByPage(1)
  // console.log(data);
  // console.log(error);
  // console.log(isLoading);

  const page = useSelector((state) => state.launches.page);
  // const lanches = useSelector((state) => state.launches.lanches);
  const totalPages = useSelector((state) => state.launches.totalPages);


  const { data, error, isLoading } = useGetLaunchesByNameQuery(page);
  // const { data, error, isLoading } =launchesApi.endpoints.getLaunchesByPage.useQuery(page);
  const dispatch = useDispatch();


  const handleLoadMore = () => {
    const nextPage = page + 1;
    if (nextPage > totalPages) {
      return;
    }
    dispatch(setPage(nextPage));
    console.log('Pressed button');
    
  };

  useEffect(()=>{
    if(data){
      dispatch(addLanches(data))
    }
  },[data])
  // useEffect(()=>{
  //   if(!isLoading){
  //     dispatch(addLanches(data));
  //     console.log('idepence of page');
  //   }
  // },[page])

  useEffect(() => {
    if (!isLoading) {
      // dispatch(addLanches(data));
      dispatch(setTotalPage(data.totalPages));
      dispatch(setPage(data.page));
      console.log('depend of isloading');
    }
  }, [isLoading,dispatch]);

  //   React.useEffect(()=>{
  // if(isLoading){
  //   if(!page===data.page){
  //      dispatch(addLanches(data))
  //   }
  // }

  // }
  //   ,[page,isLoading])

  // const filtredByName = (lanches) => {
  //   return lanches.filter((launch) => {
  //     return launch.name.toLowerCase().includes(name.toLowerCase().trim());
  //   });
  // };

  // const filtredByFlightNumber = (lanches) => {
  //   if (flightNumber === "") {
  //     return lanches;
  //   }

  //   return lanches.filter((launch) => {
  //     return launch.flight_number === Number(flightNumber);
  //   });
  // };

  // const filtredByDate = (launches) => {
  //   return launches.filter((launch) => {
  //     const newDate = new Date(launch.date_unix);

  //     return newDate.toLocaleDateString().includes(date.toLowerCase().trim());
  //   });
  // };
  // const launchesFilteredByName = filtredByName(lanches);
  // const launchesFilteredByFlightNumber = filtredByFlightNumber(
  //   launchesFilteredByName
  // );
  // const launchesFilteredByDate = filtredByDate(launchesFilteredByFlightNumber);

  

  return (
    <>
      
      <ul>
        <LaunchesView /> 
        {/* {lanches.map((launch) => (
          <li key={launch.id}>{launch.name}</li>
        ))} */}
      </ul>
      <button onClick={handleLoadMore}>Load more</button>
    </>
  );
}
