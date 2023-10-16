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
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function initializeUserAccount() {
    let form = document.getElementById("bank-form");
    let user = new BankAccount(
        form.querySelectorAll(`input[name="inputFirstName"]`).item(0).value, 
        form.querySelectorAll(`input[name="inputLastName"]`).item(0).value, 
        form.querySelectorAll(`input[name="inputEmail"]`).item(0).value, 
        form.querySelectorAll(`input[name="accountType"]`).item(0).value, 
        getRandomInteger(1, Math.pow(10,8)), 
        parseInt(form.querySelectorAll(`input[name="inputDeposit"]`).item(0).value)
    )

    config.initialPage.classList.add("d-none");
    config.bankPage.append(mainBankPage(user));
}

function mainBankPage(user) {
	let container = document.createElement("div");

	let userInfoDiv = document.createElement("div");
	let nameP = document.createElement("p");

	userInfoDiv.classList.add("text-right", "mb-2");
	nameP.classList.add("py-2");

	accountNumP = nameP.cloneNode(true);
	moneyP = nameP.cloneNode(true);

	nameP.innerHTML = user.getFullName();
	accountNumP.innerHTML = user.accountNumber;
	moneyP.innerHTML = user.money;

	userInfoDiv.append(nameP, accountNumP, moneyP);

	let balanceDiv = document.createElement("div");
	balanceDiv.classList.add("bg-danger", "d-flex", "align-items-center", "p-2", "mb-4", "font-size");
	balanceDiv.innerHTML = 
	`
		<p class="col-8 text-left">Available Balance</p>
		<p class="col-4 text-right">$${user.money}</p>
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

	menuDiv.querySelectorAll("#withdrawBtn")[0].addEventListener("click", function() {withdrawController()});
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
			    <input type="number" class="form-control text-right bill-input" id="withdraw100" placeholder="5">
			  </div>
			</div>
			<div class="form-group row align-items-center">
			  <label for="withdraw50" class="col-2">$50</label>
			  <div class="col-10">
			    <input type="number" class="form-control text-right bill-input" id="withdraw50" placeholder="1">
			  </div>
			</div>
			<div class="form-group row align-items-center">
			  <label for="withdraw20" class="col-2">$20</label>
			  <div class="col-10">
			    <input type="number" class="form-control text-right bill-input" id="withdraw20" placeholder="2">
			  </div>
			</div>
			<div class="form-group row align-items-center">
			  <label for="withdraw10" class="col-2">$10</label>
			  <div class="col-10">
			    <input type="number" class="form-control text-right bill-input" id="withdraw10" placeholder="3">
			  </div>
			</div>
			<div class="form-group row align-items-center">
			  <label for="withdraw5" class="col-2">$5</label>
			  <div class="col-10">
			    <input type="number" class="form-control text-right bill-input" withdraw5 placeholder="1">
			  </div>
			</div>
			<div class="form-group row align-items-center">
			  <label for="withdraw1" class="col-2">$1</label>
			  <div class="col-10">
			    <input type="number" class="form-control text-right bill-input" id="withdraw1" placeholder="4">
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
            <button type="button" class="btn btn-outline-primary col-12">${backStr}</button>
          </div>
          <div class="col-6 pr-0">
            <button type="button" class="btn btn-primary col-12">${nextStr}</button>
          </div>
        </div>
	`
	return container;
}

function withdrawController() {
	displayNone(config.bankPage);
	displayBlock(config.sidePage);

	config.bankPage.innerHTML = "";
	config.sidePage.innerHTML = "";

	config.sidePage.append(withdrawPage());
}

function withdrawPage() {
	let container = document.createElement("div");
	container.classList.add("p-4");
	let withdrawCon = document.createElement("div");

	withdrawCon.append(billInputSector("Please Enter The Withdrawal Amount"));
	withdrawCon.append(backNextBtn("Back", "Next"));

	let billInputs = withdrawCon.querySelectorAll(".bill-input");
	for (let i=0; i<billInputs.length; i++) {
		billInputs[i].addEventListener("click", function() {
			document.getElementById("withdrawTotal").innerHTML = billInputs[i].value;
		});
	}

	container.append(withdrawCon);
	return container;
}