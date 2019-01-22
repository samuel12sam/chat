import React, { Component } from 'react';
import './App.css';
import { ChevronDown, Home, MessageSquare, Calendar, Tag, FileText, Settings, Bell, Search } from "react-feather";
import { people } from "./api/people";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatname: "Click on a Friend to send them messages",
      country: "and read their response",
      avatar: "",
      searchterm: "",
      active: null,
      sendMessage:null,
    }
    this.allPeople = people;
    this.filteredPeople = people;
    this.openChat = this.openChat.bind(this);
    this.search = this.search.bind(this);
    this.typingMessage=this.typingMessage.bind(this);
    this.sendingMessageClick=this.sendingMessageClick.bind(this);
    this.sendingMessageEnter=this.sendingMessageEnter.bind(this);
    
  }
  
  typingMessage(e){
    this.setState({sendMessage: e.target.value});
    console.log(this.state.sendMessage);
    document.getElementById("chatbox").scroll(0, 999999);

  }

  componentDidUpdate(){
    document.getElementById("chatbox").scroll(0, 999999);
  }
  
  sendingMessageClick(){
    const { sendMessage: message } = this.state;

    if(message){
    this.filteredPeople[this.state.active].messages.push({from_friend:false, content:this.state.sendMessage});
    document.getElementById('inputChat').value = '';
    this.setState({sendMessage:""});
    this.forceUpdate();
    document.getElementById("chatbox").scroll(0, 999999);}

  }
  sendingMessageEnter(e){
    const { sendMessage: message } = this.state;
    if (e.key === 'Enter' && message) {
      this.filteredPeople[this.state.active].messages.push({from_friend:false, content:this.state.sendMessage});
      document.getElementById('inputChat').value = '';
      this.setState({sendMessage:""});
      this.forceUpdate();
      document.getElementById("chatbox").scroll(0, 999999);
    }
    
  }
  search(e) {
    this.setState({ searchterm: e.target.value });
    console.log(this.state.searchterm);
    this.filteredPeople = this.allPeople.filter(p => p.name.toLowerCase().trim().includes(this.state.searchterm.toLowerCase().trim()));
  }
  
  
  openChat(friend, index) {
    const { name, country, avatar } = friend;
    this.setState({
      active: index,
      chatname: name,
      country: `From: ${country}`,
      avatar: avatar,
    });
  }
  render() {
    return (
      <div className="App" style={{ backgroundColor: "#00000012", display: "flex", flexDirection: "row" }}>
        {/* FIRST DIV #CONTAINER1 */}
        <div style={{ display: "flex", flexDirection: "column", backgroundColor: "#c7c7c7", height: "100%", width: "15rem" }}>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <img src="https://www.picsum.photos/93/93" style={{ margin: "3rem 0 1.5rem 0", border: "5px solid white", borderRadius: "100%" }} />
            <button style={{ border: "none", background: "none", fontSize: "1.0rem", fontWeight: "600" }}>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                <div>Name LastName</div>
                <ChevronDown style={{ margin: "-1px 0 0 6.5px" }} />
              </div>
            </button>
          </div>
          <div style={{ margin: "35px 0px", minHeight: "330px", maxHeight: "330px", textAlign: "left", margin: "70px 30px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <a href="#" style={{ textDecoration: "none", color: "black" }}><Home />Propreties</a>
            <a href="#" style={{ textDecoration: "none", color: "black" }}><MessageSquare />Chat</a>
            <a href="#" style={{ textDecoration: "none", color: "black" }}><Calendar />Calendar</a>
            <a href="#" style={{ textDecoration: "none", color: "black" }}><Tag />Offers</a>
            <a href="#" style={{ textDecoration: "none", color: "black" }}><FileText />Documents</a>
            <a href="#" style={{ textDecoration: "none", color: "black" }}><Settings />Settings</a>
          </div>
        </div>

        {/* 2ND DIV #CONTAINER2 */}

        <div className="col" style={{ flex: 1 }} >
          <div className="row" style={{ justifyContent: "flex-end" }}>
            <header style={{ height: "3.2rem" }}>Status:Sale <ChevronDown /></header>
            <Bell />
          </div>
          <h1 style={{ textAlign: "left", marginLeft: "6.5rem", marginBottom: 35 }}>Chat</h1>
          <div className="row">
            <div className="col">

              {/* FRIENDS LIST */}

              <div className="row aligned " style={{ marginBottom: "20px", textAlign: "left", marginLeft: "7.5rem", paddingBottom: "25px", borderBottom: "1px solid #00000035" }}>
                <Search color="grey" />
                <input style={{ border: "none", background: "none", marginLeft: 10, fontWeight: "600" }} type="text" onChange={this.search} placeholder="Search"></input>
              </div>
              <div className="col" style={{ overflowY: "auto", height: "430px", textAlign: "left", width: "22.5rem", marginLeft: "5.5rem", padding: "0rem 0px 2rem 2rem" }}>
                {this.filteredPeople.map((p, i) => (
                  <div className={`row friend${this.state.active === i ? " active" : ""}`} key={`p.name-${i}`} onClick={() => this.openChat(p, i)}>
                    <img style={{ borderRadius: 100, width: "48px", height: "48px", marginRight: "30px" }} src={p.avatar} />
                    {p.name}
                  </div>
                ))}
              </div>
            </div>

            {/* ZOOMED CHAT */}
            <div>
              <div className="col aligned " style={{minWidth: "100%", maxWidth: "100%", minHeight: "24px", maxHeight: "24px", marginBottom: "20px", textAlign: "left", paddingLeft: "50px", paddingBottom: "25px" }}>
                <div style={{ fontWeight: "bold" }}>{this.state.chatname}</div>
                <div>{this.state.country}</div>
                <div className="col " style={{ background: "none", display: "flex", width: "650px", borderTop: "1px solid #00000035", padding: "0rem 0rem 0px 1.5rem", margin: "6.5px 0px 10px 0", borderRadius: 2, minHeight: "480px", maxHeight: "480px" }}>
                  <div id="chatbox" style={{  overflowY:"scroll", flex: "1", textAlign: "right" }}>
                    <div style={{display: "flex", flexDirection: "column", }}>
                    {this.state.active===null? <div style={{background:"#00000008",border:"1px solid #00000015", marginTop:150,textAlign:"center", fontWeight:"900"}}>• Select a friend from your friends list to start conversing</div>:
                      this.filteredPeople[this.state.active].messages.map((m, i) => (
                        m.from_friend ?
                          <div style={{ display: "flex", flexDirection: "row" }} >
                            {m.from_friend && (
                              <img style={{ width: 30, height: 30, borderRadius: 100, marginRight: 5 }} src={this.allPeople[this.state.active].avatar} />
                            )}
                            <div className="m-them">{m.content}</div>
                          </div>
                          :
                          <div style={{margin:"6px 0px"}}>
                            <text className="m-me">{m.content}</text>
                          </div>
                      ))}

                    </div>
                  </div>
                  <div className="col" style={{ padding: 0, margin: 0 }}>
                    <div className="row">
                      <button>Request Visit</button>
                      <button>Make Offer</button>
                    </div>
                    <div style={{ position: "relative" }}>
                      <input id="inputChat" onChange={this.typingMessage} onKeyPress={this.sendingMessageEnter} type="text" placeholder="Type a message..." style={{ width: "550px", padding: "15px 85px 15px 15px", background: "white", border: "none" }}></input>
                      <button onClick={this.sendingMessageClick} style={{ position: "absolute", right: 10, top: 0, background: "#0035ee50", borderRadius: 100, width: 45, height: 45, border: "none" }}>SEND</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



      </div>
    );
  }
}

export default App;
