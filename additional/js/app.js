var tdhUsers = null;
var contract = null;
const oldTdhAddy = "0x1c2bB5d2812D307C2056C6A406d334676D067EE9";
const migratorAddy = "0x386344d8F4717eBbe4c018657bf6887cC4778462";

document.getElementById('connectwallet').onclick = async () => {
  if(window.ethereum){
    await window.ethereum.request({ method: "eth_requestAccounts"});
    window.web3 = new Web3(window.ethereum);
    var accounts = await web3.eth.getAccounts();
    tdhUsers = accounts[0];
    document.getElementById('connectwallet').textContent = "Connected!";
    console.log(tdhUsers);
    oldTdh = new web3.eth.Contract(tokenAbi, oldTdhAddy);
    migrator = new web3.eth.Contract(migratorAbi, migratorAddy);
    
    document.getElementById('approveTDH').onclick = async () => {
      var content = "approving!";
      document.getElementById('approveTDH').textContent = content;
      var event = oldTdh.methods.approve(migratorAddy, "5000000000000000000000000").send({ from: tdhUsers })
          .then(function(result) {
            console.log(result);
            var content = "approved!";
            document.getElementById('approveTDH').textContent = content;
          });
    }
    
    document.getElementById('migrateTDH').onclick = async () => {
      var content = "migrating..";
      document.getElementById('migrateTDH').textContent = content;
      var event = migrator.methods.migrate().send({from: tdhUsers})
          .then(function(result) {
            console.log(result);
            var content = "migrated!";
            document.getElementById('migrateTDH').textContent = content;
          });
    }
  }
}
