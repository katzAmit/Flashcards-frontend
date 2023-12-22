import { colors } from '@mui/material';
import React from 'react';
import { VictoryBar, VictoryChart,Bar, VictoryLine, VictoryAxis } from 'victory';

export default function AlternativeEvents(props: any) {
    
    let clicked: false;
        
    return(
        <VictoryChart height={300} width={300}
          domainPadding={{ x: 50, y: [0, 20] }}
          scale={{ x: "time" }}
        >
          <VictoryBar 
            dataComponent={
              <Bar events={{ }}/>
            
            }
            style={{ data: { fill: "#83f28f" } }}
            data={props.data}
          />
        </VictoryChart>

    );
}

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