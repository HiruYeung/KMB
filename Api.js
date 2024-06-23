async function fetchData() {
    try {
      const response = await fetch('https://data.etabus.gov.hk/v1/transport/kmb/route/${route}');
      const data = await response.json();
     console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  fetchData();
  //const result = await fetchData();
  //console.dir(result);
  //console.dir( fetchData())

  

//1. 2.Route List API : when user search ,show HeadTail route : /v1/transport/kmb/route/
//2. 7.Route Stop Api : stop name : //https://data.etabus.gov.hk/v1/transport/kmb/route-stop/1A/outbound/1

//3.班次 10.stop ETA ：/v1/transport/kmb/route-eta/{route}/{service_type}

//1.API Base URL //https://data.etabus.gov.hk/