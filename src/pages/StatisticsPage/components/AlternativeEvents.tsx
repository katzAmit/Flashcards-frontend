import { colors } from '@mui/material';
import { VictoryBar, VictoryChart, VictoryLine, VictoryAxis } from 'victory';
import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AlternativeEvents(props: any) {
 
   //const demoUrl = 'https://codesandbox.io/s/simple-bar-chart-tpz8r';
    
    let clicked: false;

    
  
    return (
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={500}
          height={300}
          data={props.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="category" tick={false}/>
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          {/* const colorScale = ["#83f28f", "#F7E967", "#F1433F"]; */}
          <Bar dataKey="questions"  fill="#83f28f" activeBar={<Rectangle fill="#6352B1" stroke="blue" />} />
          <Bar dataKey="easy"  fill="#83f28f" activeBar={<Rectangle fill="#6352B1" stroke="blue" />} />
          <Bar dataKey="medium"  fill="#F7E967" activeBar={<Rectangle fill="#6352B1" stroke="blue" />} />
          <Bar dataKey="hard"  fill="#F1433F" activeBar={<Rectangle fill="#6352B1" stroke="blue" />} />
          {/* <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} /> */}
        </BarChart>
      </ResponsiveContainer>
    );}
  
        
    // return(
    //     <VictoryChart height={300} width={300}
    //       domainPadding={{ x: 50, y: [0, 20] }}
    //       scale={{ x: "time" }}
    //     >
    //       <VictoryBar 
    //         dataComponent={
    //           <Bar events={{ }}/>
            
    //         }
    //         style={{ data: { fill: "#83f28f" } }}
    //         data={props.data}
    //       />
    //     </VictoryChart>

    // );


// class AlternativeEvents extends React.Component {
//     constructor() {
//       super();
//       this.state = {
//         clicked: false,
//         style: {
//           data: { fill: "tomato" }
//         }
//       };
//     }
  
//     render() {
//       const handleMouseOver = () => {
//         const fillColor = this.state.clicked ? "blue" : "tomato";
//         const clicked = !this.state.clicked;
//         this.setState({
//           clicked,
//           style: {
//             data: { fill: fillColor }
//           }
//         });
//       };
  
//       return (
//         <div>
//           <VictoryChart height={400} width={400}
//             domainPadding={{ x: 50, y: [0, 20] }}
//             scale={{ x: "time" }}
//           >
//             <VictoryBar
//               dataComponent={
//                 <Bar events={{ onMouseOver: handleMouseOver }}/>
//               }
//               style={this.state.style}
//               data={[
//                 { x: new Date(1986, 1, 1), y: 2 },
//                 { x: new Date(1996, 1, 1), y: 3 },
//                 { x: new Date(2006, 1, 1), y: 5 },
//                 { x: new Date(2016, 1, 1), y: 4 }
//               ]}
//             />
//           </VictoryChart>
//         </div>
//       );
//     }
//    }
  
//   ReactDOM.render(<AlternativeEvents/>, mountNode);