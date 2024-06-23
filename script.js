
//Show Routes--------------------------------------//

async function searchRouteStops() {
  const routeInput = document.getElementById('routeInput');
  const routeNumber = routeInput.value.trim();
  const stopResults = document.getElementById('stopResults');

  try {
    // 获取路线信息
    const routeStopApiUrl = `https://data.etabus.gov.hk/v1/transport/kmb/route-stop`;
    const routeStopResponse = await fetch(routeStopApiUrl);
    const routeStopData = await routeStopResponse.json();

    // 过滤出指定路线的车站信息
    const filteredStops = routeStopData.data.filter(stop => stop.route === routeNumber);

    // 获取车站名称
    const stopNamePromises = filteredStops.map(async stop => {
      const stopDetailApiUrl = `https://data.etabus.gov.hk/v1/transport/kmb/stop/${stop.stop}`;
      const stopDetailResponse = await fetch(stopDetailApiUrl);
      const stopDetailData = await stopDetailResponse.json();
      return {
        route: stop.route,
        bound: stop.bound,
        serviceType: stop.service_type,
        nameTc: stopDetailData.data.name_tc,
        nameEn: stopDetailData.data.name_en
      };
    });
    const stopDetails = await Promise.all(stopNamePromises);

    // 显示结果
    stopResults.innerHTML = '';
    stopDetails.forEach(stop => {
      const stopElement = document.createElement('div');
      stopElement.textContent = `Route: ${stop.route} | Bound: ${stop.bound} | Service_type: ${stop.serviceType} | Stop: ${stop.nameTc} (${stop.nameEn})`;
      stopResults.appendChild(stopElement);
    });
  } catch (error) {
    console.error('Error:', error);
    stopResults.textContent = 'An error occurred while fetching the route stop data.';
  }
}
//------------------------------------------------------//


//StopTime----------------------------------------------//
document.getElementById('fetchData').addEventListener('click', async () => {
  const routeName = document.getElementById('routeInput').value.trim();
  const serviceType = document.getElementById('serviceType').value.trim();
  if (!routeName || !serviceType) {
      alert('Please enter service type.');
      return;
  }
  const apiUrl = `https://data.etabus.gov.hk/v1/transport/kmb/route-eta/${routeName}/${serviceType}`;
  console.log(`Fetching data from API URL: ${apiUrl}`);
  try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
          throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      const filteredRoutes = data.data.filter(route => route.route === routeName);
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = '';

      if (filteredRoutes.length > 0) {
          let firstSeqOneFound = false; // 标志位，用于跟踪第一个 seq: 1 是否已经出现

          filteredRoutes.forEach(route => {
              if (route.seq === 1) {
                  if (firstSeqOneFound) {
                      // 如果第一个 seq: 1 已经出现，插入分隔线
                      const separator = document.createElement('hr');
                      resultsDiv.appendChild(separator);
                  } else {
                      // 标记第一个 seq: 1 已经找到
                      firstSeqOneFound = true;
                  }
              }

              const routeInfo = document.createElement('p');
              routeInfo.textContent = `Route: ${route.route} | Service_type: ${route.service_type} | Time: ${route.eta}`;
              resultsDiv.appendChild(routeInfo);

              const routeInfo2 = document.createElement('h3');
              routeInfo2.textContent = ` ${route.dest_tc} ${route.dest_en} `;
              resultsDiv.appendChild(routeInfo2);
              const routeInfo3 = document.createElement('h3');
              routeInfo3.textContent = `Seq: ${route.seq} Time: ${route.eta} `;
              resultsDiv.appendChild(routeInfo3);

              const space = document.createElement('p');
              space.textContent = ` `;
              resultsDiv.appendChild(space);
          });
      } else {
          resultsDiv.textContent = `No data found for route: ${routeName}`;
      }
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching the data.');
  }
});
  //---------------------------------------------------//
//https://data.etabus.gov.hk//v1/transport/kmb/route- stop/{route}/{direction}/{service_type}
//https://data.etabus.gov.hk//v1/transport/kmb/route-stop/1A/outbound/1




