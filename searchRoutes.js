const readline = require('readline'); 
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
 
async function searchRouteStops() { 
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout }); 
    rl.question('Enter route name: ', (routeName) => { 
        rl.question('Enter service type: ', async (serviceType) => { 
            console.log('searchRouteStops function called'); 
            console.log(`User entered route name: ${routeName}`); 
            console.log(`User entered service type: ${serviceType}`); 
            try { // 构建 API 请求 URL 
                const apiUrl = `https://data.etabus.gov.hk//v1/transport/kmb/route-eta/${routeName.trim()}/${serviceType.trim()}`; 
                console.log(`Fetching data from API URL: ${apiUrl}`); 
                // 使用 Fetch API 发送 GET 请求 
                const response = await fetch(apiUrl); 
                if (!response.ok) { 
                    throw new Error(`HTTP error ${response.status}: ${response.statusText}`); 
                } const data = await response.json(); 
                // 过滤出特定的路线 
                const filteredRoutes = data.data.filter(route => route.route === routeName.trim()); 
                // 检查数据是否存在 
                if (filteredRoutes.length > 0) { 
                    // 输出结果到终端 
                    filteredRoutes.forEach(route => { 
                        console.log(`Route: ${route.route} | Seq: ${route.seq} | dest_tc: ${route.dest_tc}, | Service_type: ${route.service_type} | Stop: ${route.eta}`); }); 
                    } else { 
                        console.log(`No data found for route: ${routeName}`); } } catch (error) { 
                            console.error('Error:', error); 
                            console.log('An error occurred while fetching the data.'); 
                        } 
                            rl.close(); 
                        }); 
                    }); 
                } searchRouteStops();

//<script>
//async function searchRoutes() {
  //const routeName = document.getElementById('routeInput').value;
  //const routeResults = document.getElementById('routeResults');

  //try {
    // 构建 API 请求 URL
    //const apiUrl = `https://data.etabus.gov.hk/v1/transport/kmb/route/`;
    //console.log(`Fetching data from API URL: ${apiUrl}`);

    // 使用 Fetch API 发送 GET 请求
    //const response = await fetch(apiUrl);
    //if (!response.ok) {
      //throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    //}
    //const data = await response.json();

    // 过滤出特定的路线
    //const filteredRoutes = data.data.filter(route => route.route === routeName.trim());

    // 检查数据是否存在
    //if (filteredRoutes.length > 0) {
      // 输出结果到页面
      //routeResults.innerHTML = '';
      //filteredRoutes.forEach(route => {
        //const routeElement = document.createElement('div');
        //routeElement.textContent = `Route: ${route.route} | Bound: ${route.bound} | Service_type: ${route.service_type} | Origin: ${route.orig_en} ${route.orig_tc}`;
        //routeResults.appendChild(routeElement);
      //});
    //} else {
      //routeResults.innerHTML = `No data found for route: ${routeName}`;
    //}
  //} catch (error) {
    //console.error('Error:', error);
    //routeResults.innerHTML = 'An error occurred while fetching the data.';
  //}
//}
//</script>