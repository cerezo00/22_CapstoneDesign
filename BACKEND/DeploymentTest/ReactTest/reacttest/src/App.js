import logo from './logo.svg';
import './App.css';

function App() {
  const url = "http://49.50.165.150"

  let units1 = ["스폰지밥", "뚱이", "징징이"];

  for(let i=0; i<3; ++i){
    fetch(url + "/api/v1/example/echo/" + units1[i], {method: 'GET'})
      .then(res => res.json())
      .then(data => {
        document.getElementById("t"+(i+1)).innerHTML = data['your_message'];
    }); 
  }


  fetch(url + "/api/v1/example/test/", {method: 'GET'})
    .then(res => res.json())
    .then(data => {
      for(let i=0; i<3; ++i){
        document.getElementById("d"+(i+1)).innerHTML = data['units'][i];
      }      
  }); 
  


  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />  
      <center>
        <table border="1">
          <th>1.NGINX + 정적파일 서빙<br/>(이미지 3개)</th>
          <th>2.백엔드 통신(이름순서일치확인)</th>
          <th>3.DB 통신(문자열 3개)</th>
          <tr>
            <td ><img alt="" src={process.env.PUBLIC_URL + '/스폰지밥.jpg'} width='200' height='200'/></td>                          
            <td id="t1">Loading..</td>
            <td id="d1">No Response</td>
          </tr>
          <tr>
            <td ><img alt="" src={process.env.PUBLIC_URL + '/뚱이.jpg'} width='200' height='200'/></td>
            <td id="t2">Loading..</td>
            <td id="d2">No Response</td>
          </tr>
          <tr>
            <td ><img alt="" src={process.env.PUBLIC_URL + '/징징이.jpg'} width='200' height='200'/></td>
            <td id="t3">Loading..</td>
            <td id="d3">No Response</td>
          </tr>
        </table>
      </center>
    </div>
  );
}

export default App;
