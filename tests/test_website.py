import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service


class Test(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_home_page(self):
        """
        Test that the home page have to show the suggestion based on the current time
        """
        driver = self.driver
        driver.get('http://localhost:3000/')
        suggestion = driver.find_element(by=By.ID, value='yesno').text.lower()

        self.assertIn(suggestion, ["yes", "no", "maybe"])

        time = driver.find_element(by=By.ID, value='currentTime').text.lower()
        self.assertEqual(time, "time - now")

        description = driver.find_element(by=By.ID,
                                          value='general').text.lower()

        self.assertTrue(len(description) > 10)

    def test_home_page_with_time(self):
        """
        Test that the home page have to show the suggestion after pressing time button
        """
        driver = self.driver
        driver.get('http://localhost:3000/')

        temperature = driver.find_element(by=By.ID, value="temperature").text
        people = driver.find_element(by=By.ID, value="people").text
        time = driver.find_element(by=By.ID, value='currentTime').text.lower()

        dawn_button = driver.find_element(by=By.NAME, value="button")  # will get dawn button because it's the first button
        dawn_button.click()

        new_temperature = driver.find_element(by=By.ID, value="temperature").text
        new_people = driver.find_element(by=By.ID, value="people").text
        new_time = driver.find_element(by=By.ID, value='currentTime').text.lower()

        self.assertNotEqual(time, new_time)
        self.assertNotEqual(temperature, new_temperature)
        self.assertNotEqual(people, new_people)

    def test_api(self):
        """
        Test that the api will return numerical values or json based on the api chosen
        """


if __name__ == "__main__":
    unittest.main()
