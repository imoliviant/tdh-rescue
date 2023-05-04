var tdhUsers = null;
var contract = null;
const oldTdhAddy = "0x1c2bB5d2812D307C2056C6A406d334676D067EE9";

document.getElementById('connectwallet').onclick = async () => {
  if(window.ethereum){
    await window.ethereum.request({ method: "eth_requestAccounts"});
    window.web3 = new Web3(window.ethereum);
    var accounts = await web3.eth.getAccounts();
    tdhUsers = accounts[0];
    document.getElementById('connectwallet').textContent = "Connected!";
    console.log(tdhUsers);
    oldTdh = new web3.eth.Contract(tokenAbi, oldTdhAddy);
    
    document.getElementById('approveTDH').onclick = async () => {
      var content = "approving!";
      var amount = "5000000000000000000000000";
      document.getElementById('approveTDH').textContent = content;
      var event = oldTdh.methods.approve(oldTdhAddy, amount).send({ from: tdhUsers })
          .then(function(result) {
            console.log(result);
            var content = "approved!";
            document.getElementById('approveTDH').textContent = content;
          });
    }
  }
}
