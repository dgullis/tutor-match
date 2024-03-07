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
//expected to fail
public class search {
    private static ChromeDriver driver;
    @BeforeAll
    static void launchBrowser() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
    }
    @Test
    void searchPage() {
        driver.get("http://localhost:3000/login");
    }

    @Test
    void asStudentSearchScienceAndAleveTest() throws InterruptedException {
        driver.get("http://localhost:3000/login");
        Thread.sleep(3000);
        WebElement email = driver.findElement(By.id("exampleInputEmail1"));
        email.click();
        email.sendKeys("brunostudent@mail.com");
        WebElement correctPassword = driver.findElement (By.id("exampleInputPassword1"));
        correctPassword.click();
        correctPassword.sendKeys("Abcdefg1.",Keys.ENTER);
        Thread.sleep(3000);
        WebElement signupButton = driver.findElement(By.cssSelector(".btn"));
        signupButton.click();
        Thread.sleep(3000);
        String url = "http://localhost:3000/search";
        Thread.sleep(3000);
        Assertions.assertEquals(url,"http://localhost:3000/search" );
        WebElement hooverOptions = driver.findElement(By.xpath("//*[@id=\"root\"]/div[1]/div/div/form/div[1]/div/div/div[1]/div[2]"));
        hooverOptions.click();
        //Actions action = new Actions(driver);
        //action.moveToElement(hooverOptions).perform();
        //action.moveToElement(hooverOptions).click();
        //Thread.sleep(3000);
        Thread.sleep(3000);
        WebElement searchScience = driver.findElement(By.cssSelector(".css-t3ipsp-control .css-qbdosj-Input"));
        //searchScience.click();
        Thread.sleep(3000);
        WebElement clickScience = driver.findElement(By.id("react-select-3-option-2"));
        clickScience.click();
        Thread.sleep(3000);
        WebElement grade = driver.findElement(By.xpath("//*[@id=\\\"root\\\"]/div[1]/div/div/form/div[1]/div/div/div[1]/div[2]"));
        WebElement searchGrade = driver.findElement(By.cssSelector(".css-t3ipsp-control .css-qbdosj-Input"));
        Thread.sleep(3000);
        WebElement clickGrade = driver.findElement(By.id("react-select-5-option-1"));
        clickGrade.click();
        // for the grade the selector has the same name as the one for subject, must be change
    }

    @Test
    void notSelectingGradeAndSubjectTest() throws InterruptedException {
        driver.get("http://localhost:3000/login");
        Thread.sleep(3000);
        WebElement email = driver.findElement(By.id("exampleInputEmail1"));
        email.click();
        email.sendKeys("brunostudent@mail.com");
        WebElement correctPassword = driver.findElement (By.id("exampleInputPassword1"));
        correctPassword.click();
        correctPassword.sendKeys("Abcdefg1.",Keys.ENTER);
        Thread.sleep(3000);
        WebElement signupButton = driver.findElement(By.cssSelector(".btn"));
        signupButton.click();
        Thread.sleep(3000);
        WebElement searchButton = driver.findElement(By.cssSelector(".mx-auto"));
        searchButton.click();
        Thread.sleep(3000);
        WebElement errorMessage = driver.findElement(By.cssSelector(".fade"));
        Assertions.assertEquals("Please select a subject and grade before searching",errorMessage.getText());
    }
    @AfterAll
    static void closeBrowser() {
        driver.quit();
    }
}
