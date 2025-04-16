import unittest
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import time

class Test(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome()
        cls.baseURL = "http://localhost:3000/"

    def test_home_page(self):
        """
        Test that the home page have to show the suggestion based on the current time
        """
        driver = self.driver
        driver.get(self.baseURL)
        suggestion = driver.find_element(by=By.ID, value='yesno').text.lower()

        self.assertIn(suggestion, ["yes", "no", "maybe"])

        current_time = driver.find_element(by=By.ID, value='currentTime').text.lower()
        self.assertEqual(current_time, "time - now")

        description = driver.find_element(by=By.ID,
                                          value='general').text.lower()

        self.assertTrue(len(description) > 10)

        time.sleep(10)

    def test_home_page_with_time(self):
        """
        Test that the home page have to show the suggestion after pressing time button
        """
        driver = self.driver
        driver.get(self.baseURL)

        temperature = driver.find_element(by=By.ID, value="temperature").text
        people = driver.find_element(by=By.ID, value="people").text
        current_time = driver.find_element(by=By.ID, value='currentTime').text.lower()

        buttons = driver.find_elements(by=By.NAME, value="button")  # will get dawn button because it's the first button
        dawn_button = buttons[3]
        dawn_button.click()

        time.sleep(15)

        new_temperature = driver.find_element(by=By.ID, value="temperature").text
        new_people = driver.find_element(by=By.ID, value="people").text
        new_time = "time - afternoon"

        self.assertNotEqual(current_time, new_time)
        self.assertNotEqual(temperature, new_temperature)
        self.assertNotEqual(people, new_people)

    def test_api(self):
        """
        Test that the api will return numerical values or json based on the api chosen
        You will need to input the location or use your location
        """

        response = requests.get(f"{self.baseURL}api/suggestion")
        self.assertEqual(response.status_code, 200)
        self.assertIn(response.text, ["yes", "no", "maybe"])

        response = requests.get(f"{self.baseURL}api/people-at")
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(int(response.text), int)

        response = requests.get(f"{self.baseURL}api/people-now")
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(int(response.text), int)

        response = requests.get(f"{self.baseURL}api/average-people")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.text, "6")  # rounded down from 6.5634

        response = requests.get(f"{self.baseURL}api/max-people")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.text, "39")

        response = requests.get(f"{self.baseURL}api/min-people")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.text, "0")


if __name__ == "__main__":
    unittest.main()

