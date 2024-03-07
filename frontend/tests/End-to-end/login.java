import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.junit.jupiter.api.Assertions;

import javax.swing.plaf.TableHeaderUI;

public class login {
    private static ChromeDriver driver;
    @BeforeAll
    static void launchBrowser() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
    }
    @Test
    void singUpPage() {
        driver.get("http://localhost:3000/login");
    }
    @Test
    void correctEmailAndCorrectPasswordTest() throws InterruptedException {
        driver.get("http://localhost:3000/login");
        Thread.sleep(3000);
        WebElement email = driver.findElement(By.id("exampleInputEmail1"));
        email.click();
        email.sendKeys("student1@mail.com");
        WebElement correctPassword = driver.findElement (By.id("exampleInputPassword1"));
        correctPassword.click();
        correctPassword.sendKeys("Abcdefg1.",Keys.ENTER);
        Thread.sleep(2000);
        String url = "http://localhost:3000/search";
        Assertions.assertEquals(url,"http://localhost:3000/search" );
    }
    @Test
    void wrongPasswordForExistingEmailTest() throws InterruptedException {
        driver.get("http://localhost:3000/login");
        Thread.sleep(3000);
        WebElement email = driver.findElement(By.id("exampleInputEmail1"));
        email.click();
        email.sendKeys("student1@mail.com");
        WebElement wrongPassword = driver.findElement (By.id("exampleInputPassword1"));
        wrongPassword.click();
        wrongPassword.sendKeys("Abcdefg4.",Keys.ENTER);
        Thread.sleep(2000);
        WebElement errorMessage = driver.findElement(By.cssSelector(".alert"));
        Assertions.assertEquals(errorMessage.getText(),"You entered a wrong username or password.");

    }
    @Test
    void logingAsAStudentTakeStudentProfileTest() throws InterruptedException {
        driver.get("http://localhost:3000/login");
        Thread.sleep(3000);
        WebElement email = driver.findElement(By.id("exampleInputEmail1"));
        email.click();
        email.sendKeys("student1@mail.com");
        WebElement wrongPassword = driver.findElement (By.id("exampleInputPassword1"));
        wrongPassword.click();
        wrongPassword.sendKeys("Abcdefg1.",Keys.ENTER);
        WebElement signupButton = driver.findElement(By.cssSelector(".btn"));
        signupButton.click();
        String url = "http://localhost:3000/search";
        Assertions.assertEquals(url,"http://localhost:3000/search" );
        Thread.sleep(3000);
        //driver.get("http://localhost:3000/search");
        WebElement clickProfileButton = driver.findElement(By.linkText("Profile"));
        clickProfileButton.click();
        Thread.sleep(3000);
        WebElement studentProfile = driver.findElement(By.cssSelector("h2"));
        Assertions.assertEquals("Student Details",studentProfile.getText());
    }
    @AfterAll
    static void closeBrowser() {
        driver.quit();
    }
}