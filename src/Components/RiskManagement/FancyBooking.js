import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Transparent from '../../images/transparent.gif';
import { useSelector,useDispatch } from 'react-redux';
import { getRiskFancyEventList } from '../../Redux/action/Risk';
import { toast } from "react-toastify";
const FancyBooking = (props) => {
    const dispatch = useDispatch();
    let {token,user,pl_agent_path} = useSelector(state=>state.auth);
    let {selectedItem,setshowLogs} = props;
    let [winAmmount,setwinAmmount] = useState([]);
    useEffect(() => {
        console.log(selectedItem.selection_id);
        dispatch(getRiskFancyEventList({sid:token,selection_id:selectedItem.selection_id})).then((response)=>{
            if(response.items.length>0){
                let runs = response.items[0].run;
                let item = [];
                for (let run in runs){
                    item[run] = runs[run];
                }
                setwinAmmount(item);
                console.log(item);
            }
        },(err)=>{
            toast.danger(err);
        });
     },[]);

    const HandelCloseModal = ()=>{
        setshowLogs(false);
    }

  return (
    <div id="agentlog" className="pop_bg" style={{top:'0',display: 'block'}}>  
        <div className="log-wrap" style={{margin:'9vh', width: "1280px"}}>
            <table className="game-team">
              <tbody>
                  <tr>
                      <td className="game-name risk-popup-modal">{selectedItem.event_name}<span>{selectedItem.market_name}</span>
                          <Link to="" style={{top:'-1px'}} onClick={()=>{HandelCloseModal()}} className="pop-close" >
                            <img className="icon-back" src={Transparent}/>Close
                          </Link>
                      </td>
                  </tr>
              </tbody>
            </table>
            <div className="pop-content">
            <div className="pop-title">
              <h2>Run Position</h2>
              <div className="">
                <table className="table01 tab-depth">
                  <thead>
                    <tr>
                      <th className="align-L" style={{width:'50%'}}>Run</th>
                      <th className="border-l" style={{width:'50%'}}>Amount</th>
                    </tr>
                  </thead>
                  <tbody >
                    {winAmmount.length > 0 && winAmmount.map((item,index)=>{
                        let amount = (parseFloat(item).toFixed(2) >= 0)?parseFloat(item).toFixed(2):`(${parseFloat(Math.abs(item)).toFixed(2)})`;
                        return(
                            <tr>
                                <td className={`${(parseFloat(item).toFixed(2) < 0)?'align-L lay':'align-L back'}`}>{index}</td>
                                <td className={`${(parseFloat(item).toFixed(2) < 0)?'lay':'back'}`} ><span className={`${(parseFloat(item).toFixed(2) < 0)?'red':''}`}>{amount}</span></td>
                            </tr>
                        );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default FancyBooking