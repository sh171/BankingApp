const config = {
	initialPage : document.getElementById("initial-form"), 
	bankPage : document.getElementById("bank-page")
}
// console.log(config.initialPage);
// console.log(config.bankPage);

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
        form.querySelectorAll(`[name="inputFirstName"]`).item(0).value, 
        form.querySelectorAll(`input[name="inputLastName"]`).item(0).value, 
        form.querySelectorAll(`input[name="inputEmail"]`).item(0).value, 
        form.querySelectorAll(`input[name="accountType"]`).item(0).value, 
        getRandomInteger(1, Math.pow(10,8)), 
        parseInt(form.querySelectorAll(`input[name="inputDeposit"]`).item(0).value)
    )
    console.log(user);

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

	menuDiv.querySelectorAll("#withdrawBtn")[0].addEventListener("click", function() {alert("This is withdraw button")});
	menuDiv.querySelectorAll("#depositBtn")[0].addEventListener("click", function() {alert("This is deposit button")});
	menuDiv.querySelectorAll("#comeBackLaterBtn")[0].addEventListener("click", function() {alert("This is come back later button")});

	container.append(userInfoDiv);
	container.append(balanceDiv);
	container.append(menuDiv);
	return container;
}