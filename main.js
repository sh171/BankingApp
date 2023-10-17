function displayNone(ele) {
	ele.classList.remove("d-block");
	ele.classList.add("d-none");
}

function displayBlock(ele) {
	ele.classList.remove("d-none");
	ele.classList.add("d-block");
}

const config = {
	initialPage : document.getElementById("initial-form"), 
	bankPage : document.getElementById("bank-page"),
	sidePage : document.getElementById("side-page")
}

class BankAccount{
	maxWithdrawParcent = 0.2;

    constructor(firstName, lastName, email, type, accountNumber, money) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.type = type;
        this.accountNumber = accountNumber;
        this.money = money;
    }

    getFullName(){
        return this.firstName + " " + this.lastName;
    }

    calculateWithdrawAmount(amount) {
    	let maxAvailableWithdraw = this.money * this.maxWithdrawParcent;
    	amount = amount > maxAvailableWithdraw ? maxAvailableWithdraw : amount;
    	return amount;
    }
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function initializeUserAccount() {
    let form = document.getElementById("bank-form");
    let userAccount = new BankAccount(
        form.querySelectorAll(`input[name="inputFirstName"]`).item(0).value, 
        form.querySelectorAll(`input[name="inputLastName"]`).item(0).value, 
        form.querySelectorAll(`input[name="inputEmail"]`).item(0).value, 
        form.querySelectorAll(`input[name="accountType"]`).item(0).value, 
        getRandomInteger(1, Math.pow(10,8)), 
        parseInt(form.querySelectorAll(`input[name="inputDeposit"]`).item(0).value)
    )

    config.initialPage.classList.add("d-none");
    config.bankPage.append(mainBankPage(userAccount));
}

function mainBankPage(userAccount) {
	let container = document.createElement("div");

	let userInfoDiv = document.createElement("div");
	let nameP = document.createElement("p");

	userInfoDiv.classList.add("text-right", "mb-2");
	nameP.classList.add("py-2");

	accountNumP = nameP.cloneNode(true);
	moneyP = nameP.cloneNode(true);

	nameP.innerHTML = userAccount.getFullName();
	accountNumP.innerHTML = userAccount.accountNumber;
	moneyP.innerHTML = userAccount.money;

	userInfoDiv.append(nameP, accountNumP, moneyP);

	let balanceDiv = document.createElement("div");
	balanceDiv.classList.add("bg-danger", "d-flex", "align-items-center", "p-2", "mb-4", "font-size");
	balanceDiv.innerHTML = 
	`
		<p class="col-8 text-left">Available Balance</p>
		<p class="col-4 text-right">$${userAccount.money}</p>
	`

	let menuDiv = document.createElement("div");
	menuDiv.classList.add("d-flex", "flex-wrap");
	menuDiv.innerHTML = 
	`
		<div class="col-12 col-lg-4 px-0 px-md-1">
			<div id="withdrawBtn" class="bg-blue p-3 mb-2 mb-md-4 pointer">
				<h5>WITHDRAWAL</h5>
				<i class="fa-solid fa-wallet fa-3x"></i>
			</div>
        </div>
		<div class="col-12 col-lg-4 px-0 px-md-1">
			<div id="depositBtn" class="bg-blue p-3 mb-2 mb-md-4 pointer">
                <h5>Deposit</h5>
                <i class="fa-solid fa-coins fa-3x"></i>
            </div>
		</div>
		<div class="col-12 col-lg-4 px-0 px-md-1">
			<div id="comeBackLaterBtn" class="bg-blue p-3 mb-2 pointer">
                <h5>Come Back Later</h5>
                <i class="fa-solid fa-house fa-3x"></i>
            </div>
		</div>
	`

	menuDiv.querySelectorAll("#withdrawBtn")[0].addEventListener("click", function() {withdrawController(userAccount)});
	menuDiv.querySelectorAll("#depositBtn")[0].addEventListener("click", function() {alert("This is deposit button")});
	menuDiv.querySelectorAll("#comeBackLaterBtn")[0].addEventListener("click", function() {alert("This is come back later button")});

	container.append(userInfoDiv);
	container.append(balanceDiv);
	container.append(menuDiv);
	return container;
}

function billInputSector(title) {
	let container = document.createElement("div");
	container.innerHTML = 
	`
		<h3 class="mb-3">${title}</h3>
		<!-- input money -->
		<div class="form">
			<div class="form-group row align-items-center">
			  <label for="withdraw100" class="col-2">$100</label>
			  <div class="col-10">
			    <input type="number" class="form-control text-right bill-input" data-bill="100" id="withdraw100" placeholder="5">
			  </div>
			</div>
			<div class="form-group row align-items-center">
			  <label for="withdraw50" class="col-2">$50</label>
			  <div class="col-10">
			    <input type="number" class="form-control text-right bill-input" id="withdraw50" data-bill="50" placeholder="1">
			  </div>
			</div>
			<div class="form-group row align-items-center">
			  <label for="withdraw20" class="col-2">$20</label>
			  <div class="col-10">
			    <input type="number" class="form-control text-right bill-input" id="withdraw20" data-bill="20" placeholder="2">
			  </div>
			</div>
			<div class="form-group row align-items-center">
			  <label for="withdraw10" class="col-2">$10</label>
			  <div class="col-10">
			    <input type="number" class="form-control text-right bill-input" id="withdraw10" data-bill="10" placeholder="3">
			  </div>
			</div>
			<div class="form-group row align-items-center">
			  <label for="withdraw5" class="col-2">$5</label>
			  <div class="col-10">
			    <input type="number" class="form-control text-right bill-input" data-bill="5" id="withdraw5" placeholder="1">
			  </div>
			</div>
			<div class="form-group row align-items-center">
			  <label for="withdraw1" class="col-2">$1</label>
			  <div class="col-10">
			    <input type="number" class="form-control text-right bill-input" data-bill="1" id="withdraw1" placeholder="4">
			  </div>
			</div>
			<!-- total money -->
			<div class="col-12 bg-info p-3 double-border">
			  <p id="withdrawTotal" class="text-white">$0.00</p>
			</div>
		</div>
	`
	return container;
}

function backNextBtn(backStr, nextStr) {
	let container = document.createElement("div");
	container.innerHTML =
	`
		<div class="d-flex mt-3">
          <div class="col-6 pl-0">
            <button type="button" class="btn btn-outline-primary col-12 back-btn">${backStr}</button>
          </div>
          <div class="col-6 pr-0">
            <button type="button" class="btn btn-primary col-12 next-btn">${nextStr}</button>
          </div>
        </div>
	`
	return container;
}

function withdrawController(userAccount) {
	displayNone(config.bankPage);
	displayBlock(config.sidePage);

	config.bankPage.innerHTML = "";
	config.sidePage.innerHTML = "";

	config.sidePage.append(withdrawPage(userAccount));
}

function withdrawPage(userAccount) {
	let container = document.createElement("div");
	container.classList.add("p-4");
	let withdrawCon = document.createElement("div");

	withdrawCon.append(billInputSector("Please Enter The Withdrawal Amount"));
	withdrawCon.append(backNextBtn("Back", "Next"));

	let billInputs = withdrawCon.querySelectorAll(".bill-input");
	for (let i=0; i<billInputs.length; i++) {
		billInputs[i].addEventListener("click", function() {
			document.getElementById("withdrawTotal").innerHTML = billSummation(billInputs, "data-bill");
		});
	}

	let backBtn = withdrawCon.querySelectorAll(".back-btn")[0];
	backBtn.addEventListener("click", function() {
		displayNone(config.sidePage);
		displayBlock(config.bankPage);

		config.bankPage.append(mainBankPage(userAccount));
	});

	let nextBtn = withdrawCon.querySelectorAll(".next-btn")[0];
	nextBtn.addEventListener("click", function() {
		container.innerHTML = "";
		container.append(billDialog("The money you are going to take is ...", billInputs, "data-bill"));

		let total = userAccount.calculateWithdrawAmount(billSummation(billInputs, "data-bill"));

		container.innerHTML += 
		`
			<div class="bg-danger d-flex align-items-center p-2 my-4 font-size text-white">
				<p class="col-8 text-left">Total to be withdrawn: </p>
				<p class="col-4 text-right">$${total}</p>
			</div>
		`
		container.append(backNextBtn("Go Back", "Confirm"));
	});

	container.append(withdrawCon);
	return container;
}

function billSummation(billNodeList, billAttribute) {
	let summation = 0;
	for (let i=0; i<billNodeList.length; i++) {
		let currEle = billNodeList[i];
		let value = parseInt(currEle.value);
		value *= parseInt(currEle.getAttribute("data-bill"));
		if(value > 0) summation += value;	
	}
	return summation;
}

function billDialog(title, billNodeList, billData) {
	let container = document.createElement("div");

	let billEle = "";
	for (let i=0; i<billNodeList.length; i++) {
		let value = billNodeList[i].value;
		if (value > 0) {
			let bill = billNodeList[i].getAttribute("data-bill");
			billEle += `<p class="font-size single-border mb-2 pr-1 py-2">${value} * $${bill}</p>`
		}
	}

	let total = `<p class="font-size">Total: $${billSummation(billNodeList, "data-bill")}</p>`;

	container.innerHTML = 
	`
		<h3 class="mb-3">${title}</h3>
		<div class="d-flex justify-content-center">
            <div class="col-8 bg-info text-white text-right p-2">
            	${billEle}
            	${total}
            </div>
        </div>
	`
	return container;
}