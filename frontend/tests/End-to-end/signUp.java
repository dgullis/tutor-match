import dev.failsafe.internal.util.Assert;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.apache.commons.io.FileUtils;
import org.bouncycastle.oer.its.etsi102941.Url;
import org.checkerframework.checker.units.qual.K;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.junit.jupiter.api.Assertions;
import org.openqa.selenium.support.ByIdOrName;

import javax.swing.plaf.TableHeaderUI;
import java.io.File;

import java.util.List;

public class SignUp {
    private static ChromeDriver driver;

    @BeforeAll
    static void launchBrowser() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
    }

    //Test in here
    @Test
    void singUpPage() {
        driver.get("http://localhost:3000/signup");
    }

    @Test
    void spaceInEmailTest() throws InterruptedException {
        driver.get("http://localhost:3000/signup");
        Thread.sleep(3000);
        WebElement nameToRegister = driver.findElement(By.id("signupName"));
        nameToRegister.click();
        nameToRegister.sendKeys("Alex");
        WebElement spaceInMail = driver.findElement(By.id("signupEmail"));
        spaceInMail.click();
        spaceInMail.sendKeys(" alex@mail.com");
        WebElement password = driver.findElement(By.id("signupPassword"));
        password.click();
        password.sendKeys("Abcdefg1.");
        WebElement confirmPassword = driver.findElement(By.id("confirmPassword"));
        confirmPassword.click();
        confirmPassword.sendKeys("Abcdefg1.");
        WebElement studentselector = driver.findElement(By.id("customRadio2"));
        studentselector.click();
        WebElement signupButton = driver.findElement(By.cssSelector(".btn"));
        signupButton.click();
        String url = "http://localhost:3000/profile";
        Assertions.assertEquals(url, "http://localhost:3000/profile");
    }
    @Test
    void specialCharactersInEmailTest() throws InterruptedException {
        driver.get("http://localhost:3000/signup");
        Thread.sleep(3000);
        WebElement nameToRegister = driver.findElement(By.id("signupName"));
        nameToRegister.click();
        nameToRegister.sendKeys("Alex");
        WebElement spaceInMail = driver.findElement(By.id("signupEmail"));
        spaceInMail.click();
        spaceInMail.sendKeys("A!£e*@mail.com");
        WebElement password = driver.findElement(By.id("signupPassword"));
        password.click();
        password.sendKeys("Abcdefg1.");
        WebElement confirmPassword = driver.findElement(By.id("confirmPassword"));
        confirmPassword.click();
        confirmPassword.sendKeys("Abcdefg1.");
        WebElement studentselector = driver.findElement(By.id("customRadio2"));
        studentselector.click();
        WebElement signupButton = driver.findElement(By.cssSelector(".btn"));
        signupButton.click();
        String url = "http://localhost:3000/profile";
        Assertions.assertEquals(url, "http://localhost:3000/profile");

    }
    @Test
    void blankSpaceEmailTest() throws Exception {
        driver.get("http://localhost:3000/signup");
        Thread.sleep(3000);
        WebElement nameToRegister = driver.findElement(By.id("signupName"));
        nameToRegister.click();
        nameToRegister.sendKeys("Alex");
        WebElement spaceInMail = driver.findElement(By.id("signupEmail"));
        spaceInMail.click();
        spaceInMail.sendKeys(" ");
        WebElement password = driver.findElement(By.id("signupPassword"));
        password.click();
        password.sendKeys("Abcdefg1.");
        WebElement confirmPassword = driver.findElement(By.id("confirmPassword"));
        confirmPassword.click();
        confirmPassword.sendKeys("Abcdefg1.");
        WebElement studentselector = driver.findElement(By.id("customRadio2"));
        studentselector.click();
        WebElement signupButton = driver.findElement(By.cssSelector(".btn"));
        Thread.sleep(3000);
        signupButton.click();
        Thread.sleep(2000);
        WebElement errorMessage = driver.findElement(By.cssSelector(".alert"));
        Assertions.assertEquals(errorMessage.getText(),"Email address is not valid. Please try again.");

    }

    @Test
    void shortPasswordTest() throws InterruptedException {
        driver.get("http://localhost:3000/signup");
        Thread.sleep(3000);
        WebElement nameToRegister = driver.findElement(By.id("signupName"));
        nameToRegister.click();
        nameToRegister.sendKeys("Alex");
        WebElement spaceInMail = driver.findElement(By.id("signupEmail"));
        spaceInMail.click();
        spaceInMail.sendKeys("alex@mail.com");
        WebElement password = driver.findElement(By.id("signupPassword"));
        password.click();
        password.sendKeys("Ab1.");
        WebElement confirmPassword = driver.findElement(By.id("confirmPassword"));
        confirmPassword.click();
        confirmPassword.sendKeys("Ab1.");
        WebElement studentselector = driver.findElement(By.id("customRadio2"));
        studentselector.click();
        WebElement signupButton = driver.findElement(By.cssSelector(".btn"));
        Thread.sleep(3000);
        signupButton.click();
        WebElement errorMessage = driver.findElement(By.cssSelector(".alert"));
        Assertions.assertEquals(errorMessage.getText(), "Password doesn't meet requirements. Please try again.");
    }

    @Test
    void repeatedEmailNameTest() throws InterruptedException {
        driver.get("http://localhost:3000/signup");
        Thread.sleep(3000);
        WebElement nameToRegister = driver.findElement(By.id("signupName"));
        nameToRegister.click();
        nameToRegister.sendKeys("student1");
        WebElement spaceInMail = driver.findElement(By.id("signupEmail"));
        spaceInMail.click();
        spaceInMail.sendKeys("student1@mail.com");
        WebElement password = driver.findElement(By.id("signupPassword"));
        password.click();
        password.sendKeys("Abcdefg1.");
        WebElement confirmPassword = driver.findElement(By.id("confirmPassword"));
        confirmPassword.click();
        confirmPassword.sendKeys("Abcdefg1.");
        WebElement studentselector = driver.findElement(By.id("customRadio2"));
        studentselector.click();
        WebElement signupButton = driver.findElement(By.cssSelector(".btn"));
        signupButton.click();
        Thread.sleep(3000);
        WebElement errorMessage = driver.findElement(By.cssSelector(".alert"));
        Assertions.assertEquals(errorMessage.getText(), "Email is already in use. Please try logging in instead.");
    }

    @Test
    void spacesInPasswordTest() throws InterruptedException {
        driver.get("http://localhost:3000/signup");
        Thread.sleep(3000);
        WebElement nameToRegister = driver.findElement(By.id("signupName"));
        nameToRegister.click();
        nameToRegister.sendKeys("bruno");
        WebElement spaceInMail = driver.findElement(By.id("signupEmail"));
        spaceInMail.click();
        spaceInMail.sendKeys("brunostudent@mail.com");
        WebElement password = driver.findElement(By.id("signupPassword"));
        password.click();
        password.sendKeys("A b c d e f g 1.");
        WebElement confirmPassword = driver.findElement(By.id("confirmPassword"));
        confirmPassword.click();
        confirmPassword.sendKeys("A b c d e f g 1.");
        Thread.sleep(3000);
        WebElement studentselector = driver.findElement(By.id("customRadio2"));
        studentselector.click();
        WebElement signupButton = driver.findElement(By.cssSelector(".btn"));
        signupButton.click();
        String url = "http://localhost:3000/profile";
        Assertions.assertEquals(url, "http://localhost:3000/profile");
    }

    @AfterAll
    static void closeBrowser() {
        driver.quit();
    }
}