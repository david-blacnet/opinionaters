package utils;

import com.thoughtworks.gauge.Step;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import utils.driver.Driver;

import static org.assertj.core.api.Assertions.assertThat;

public class FlashMessages {
    @Step("Show a message <message>")
    public void showAWelcomeMessage(String message) {
        WebDriver webDriver = Driver.webDriver;
        WebElement flashNoticeElement = webDriver.findElement(By.xpath(String.format("//div[@id = 'flash_notice' and text() = '%s']", message)));
        assertThat(flashNoticeElement.isDisplayed()).isTrue();
    }
}
