import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;

import javax.swing.plaf.TableHeaderUI;
import java.awt.*;
import java.security.Key;
//most test expected to fail due to changes
public class profile {
    private static ChromeDriver driver;
    @BeforeAll
    static void launchBrowser() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
    }
    @Test
    void loginAsTutorTest () throws InterruptedException {
        driver.get("http://localhost:3000/login");
        Thread.sleep(3000);
        WebElement email = driver.findElement(By.id("exampleInputEmail1"));
        email.click();
        email.sendKeys("brunotutor@mail.com");
        WebElement correctPassword = driver.findElement (By.id("exampleInputPassword1"));
        correctPassword.click();
        correctPassword.sendKeys("Abcdefg1.",Keys.ENTER);
        Thread.sleep(3000);
        WebElement signupButton = driver.findElement(By.cssSelector(".btn"));
        signupButton.click();
        WebElement tutorDetails = driver.findElement(By.cssSelector("h2"));
        Assertions.assertEquals("Tutor Details",tutorDetails.getText());
    }
    @Test
    void asTutorSelectGradeSubjectAlreadyBeenAddedTest() throws InterruptedException {
        driver.get("http://localhost:3000/login");
        Thread.sleep(3000);
        WebElement email = driver.findElement(By.id("exampleInputEmail1"));
        email.click();
        email.sendKeys("brunotutor@mail.com");
        WebElement correctPassword = driver.findElement (By.id("exampleInputPassword1"));
        correctPassword.click();
        correctPassword.sendKeys("Abcdefg1.",Keys.ENTER);
        Thread.sleep(3000);
        WebElement signupButton = driver.findElement(By.cssSelector(".btn"));
        signupButton.click();
        Thread.sleep(3000);
        WebElement selectSubject = driver.findElement(By.cssSelector(".form-select"));
        selectSubject.click();
        WebElement dropdown = driver.findElement(By.cssSelector(".form-select"));
        dropdown.findElement(By.xpath("//option[. = 'Science']")).click();
        Thread.sleep(3000);
        WebElement carrera = driver.findElement(By.cssSelector(".custom-control:nth-child(2) > .custom-control-label"));
        carrera.click();
        Thread.sleep(3000);
        WebElement clickButton = driver.findElement(By.cssSelector(".d-grid > .pt-3"));
        clickButton.click();
        Thread.sleep(3000);
        WebElement banner = driver.findElement(By.cssSelector(".fade"));
        Assertions.assertEquals("You have already added this subject/grade.", banner.getText());

    }
    @Test
    void asTutorAddAvailavilityTest() throws InterruptedException {
        driver.get("http://localhost:3000/login");
        Thread.sleep(3000);
        WebElement email = driver.findElement(By.id("exampleInputEmail1"));
        email.click();
        email.sendKeys("brunotutor@mail.com");
        WebElement correctPassword = driver.findElement (By.id("exampleInputPassword1"));
        correctPassword.click();
        correctPassword.sendKeys("Abcdefg1.",Keys.ENTER);
        Thread.sleep(3000);
        WebElement signupButton = driver.findElement(By.cssSelector(".btn"));
        signupButton.click();
        Thread.sleep(3000);
        WebElement searchDay = driver.findElement(By.id("startdatetimepicker"));
        searchDay.click();
        searchDay.sendKeys("10-03-24 12:00");

        Thread.sleep(3000);
        //WebElement selectDay = driver.findElement(By.xpath("//*[@id=\"root\"]/div[3]/div/div/div/div/form/span[1]/span[2]"));
        //selectDay.click();
        //Thread.sleep(3000);
        //WebElement searchHour = driver.findElement(By.xpath("//*[@id=\"root\"]/div[3]/div/div/div/div/form/span[1]/span[3]"));
        //searchHour.click();
    }
    @AfterAll
    static void closeBrowser() {
        driver.quit();
    }
}
