const {By,Key,Builder} = require("selenium-webdriver");
const { NoSuchElementError } = require("selenium-webdriver/lib/error");
require("chromedriver");

var points = 0;
var errorLst = [];
 
async function setup(){
 

    //To wait for browser to build and launch properly
    let driver = await new Builder().forBrowser("chrome").build();
    //To fetch http://localhost:3000/ from the browser with our code.
    await driver.get("http://localhost:3000/");



	// Test Card Addition
    await driver.findElement(By.className("txtBookTitle")).sendKeys("Book 1",Key.RETURN);
    let btn = await driver.findElement(By.className("btnAddBook"));
    await btn.click();

	let cardNum = (await driver.findElements(By.xpath(".//div[@class='cardBookList']/div"))).length;

	if (cardNum == 1) {
		points += 1
	} else {
		errorLst.push("Book is not added as expected")
	}



	// Check Div Elements

	// Check Book Name
	try {
		var cardTxt = await driver.findElement(By.id("cardName0")).getText()
		if (cardTxt.toUpperCase() == "BOOK 1") {
			points += 1
		} else {
			errorLst.push("Error in Name of book")
		}
	} catch (error) {
		errorLst.push("Error in Name of book")
	}

	// Check Book 1 Card Buttons
	try {
		var cardLikeTxt = await driver.findElement(By.id("likeNum0")).getText()
		var cardDislikeTxt = await driver.findElement(By.id("dislikeNum0")).getText()
		if (cardDislikeTxt.toUpperCase() == "0" && cardLikeTxt.toUpperCase() == "0") {
			points += 1
		} else {
			errorLst.push("Error in card button text as not 0 initially")
		}

		var btn1 = await driver.findElement(By.id("likeBtn0"));
		await btn1.click();
		var btn2 = await driver.findElement(By.id("dislikeBtn0"))
		await btn2.click();

		cardLikeTxt = await driver.findElement(By.id("likeNum0")).getText()
		cardDislikeTxt = await driver.findElement(By.id("dislikeNum0")).getText()

		if (cardDislikeTxt.toUpperCase() == "1" && cardLikeTxt.toUpperCase() == "1") {
			points += 1
		} else {
			errorLst.push("Error in card button as not incrementing likes and/or dislikes")
		}

	} catch (error) {
		errorLst.push("Error in card buttons or/and text")
	}



	// Add more elements and check order

	// Add more books
	await driver.findElement(By.className("txtBookTitle")).sendKeys("Book 2",Key.RETURN);
    btn = await driver.findElement(By.className("btnAddBook"));
    await btn.click();

	await driver.findElement(By.className("txtBookTitle")).sendKeys("Book 3",Key.RETURN);
	await btn.click();


	// Test Number of books which should be 3
	cardNum = (await driver.findElements(By.xpath(".//div[@class='cardBookList']/div"))).length;

	if (cardNum == 3) {
		points += 1
	} else {
		errorLst.push("Cannot add books appropriately")
	}


	// Click Book 2 like and dislike button to increase its popularity

	try {

		btn1 = await driver.findElement(By.id("likeBtn1"));
		await btn1.click();
		btn2 = await driver.findElement(By.id("dislikeBtn1"))
		// await btn2.click();
		await btn1.click();
		await btn1.click();

		cardLikeTxt = await driver.findElement(By.id("likeNum1")).getText()
		cardDislikeTxt = await driver.findElement(By.id("dislikeNum1")).getText()

		if (cardDislikeTxt.toUpperCase() == "0" && cardLikeTxt.toUpperCase() == "3") {
			points += 1
		} else {
			errorLst.push("Error in card button as not incrementing likes and/or dislikes")
		}

	} catch (error) {
		errorLst.push("Error in card buttons or/and text when multiple are added ")
		console.log(error)
	}


	// Output
	if (errorLst.length !== 0) {
		console.log("\nError Log:")
		errorLst.forEach(err => {
			console.log(err)
		});
		console.log("")
	} else {
		console.log("\nCongratulations!!! You have no errors \n")
	}
	console.log("Total Points: " + points + "/6\n")

    //Quit the browser after execution
    await driver.quit();
 
}

setup();