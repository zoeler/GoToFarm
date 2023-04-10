// import React from "react";
// import ReactDOM from "react-dom";
// import axios from "axios";

// class App extends React.Component {
//   state = {
//     img: ""
//   };
//   onChange = e => {
//     const file = e.target.files.item(0); // 取得選中檔案們的一個檔案
//     const fileReader = new FileReader(); // FileReader為瀏覽器內建類別，用途為讀取瀏覽器選中的檔案
//     fileReader.addEventListener("load", this.fileLoad);
//     fileReader.readAsDataURL(file); // 讀取完檔案後，變成URL
//   };
//   // e為第13行發出load之事件
//   fileLoad = e => {
//     this.setState({
//       img: e.target.result // 讀取到DataURL後，儲存在result裡面，指定為img
//     });
//   };
//   submit = () => {
//     // json base64
//     axios.post("/img", { img: this.state.img });
//   };
//   render() {
//     return (
//       <div>
//         <h1>圖片預覽與檔案上傳</h1>
//         <input type="file" onChange={this.onChange} />
//         <img width="100%" src={this.state.img} />
//       </div>
//     );
//   }
// }
// export default App;

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
