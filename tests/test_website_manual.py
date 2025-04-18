import unittest
import requests
from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import time


class SeleniumTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.baseURL = "http://localhost:3000"
        self.driver.get(self.baseURL)
        self.actions = ActionChains(self.driver)

    def test_01_home_page(self):
        """
        Test that the home page have to show the suggestion based on the current time
        """
        driver = self.driver
        suggestion = driver.find_element(by=By.ID, value='yesno').text.lower()

        self.assertIn(suggestion, ["yes", "no", "maybe"])

        current_time = driver.find_element(by=By.ID, value='currentTime').text.lower()
        self.assertEqual(current_time, "time - now")

        description = driver.find_element(by=By.ID,
                                          value='general').text.lower()

        self.assertTrue(len(description) > 10)

        time.sleep(12)

    def test_02_home_page_with_time(self):
        """
        Test that the home page have to show the suggestion after pressing time button
        """
        driver = self.driver

        temperature = driver.find_element(by=By.ID, value="temperature").text
        people = driver.find_element(by=By.ID, value="people").text
        current_time = driver.find_element(by=By.ID, value='currentTime').text.lower()

        buttons = driver.find_elements(by=By.NAME, value="button")  # will get dawn button because it's the first button
        dawn_button = buttons[0]

        time.sleep(4)

        self.actions.click_and_hold(dawn_button).perform()
        # Hold the click for 2 seconds
        time.sleep(2)
        # Release the click
        self.actions.release().perform()

        time.sleep(2)
        new_temperature = driver.find_element(by=By.ID, value="temperature").text
        new_people = driver.find_element(by=By.ID, value="people").text
        new_time = "time - dawn"

        self.assertNotEqual(current_time, new_time)
        self.assertNotEqual(temperature, new_temperature)
        self.assertNotEqual(people, new_people)

        time.sleep(5)

    def test_03_home_page_api_button(self):
        driver = self.driver

        api_button = driver.find_element(by=By.ID, value="api")

        time.sleep(5)
        self.actions.click_and_hold(api_button).perform()

        time.sleep(2)
        self.actions.release().perform()

        time.sleep(2)
        current_url = driver.current_url
        self.assertEqual(f"{self.baseURL}/api", current_url)

        time.sleep(3)


class APITest(unittest.TestCase):
    def setUp(self):
        self.baseURL = "http://localhost:3000/"
        self.time = {
            'time': 'Dawn'
        }

    def test_suggestion(self):
        """
        Test the suggestion endpoint with latitude and longitude
        """
        params = {
            'lat': 10.3212,
            'lon': 13.1323
        }
        response = requests.get(f"{self.baseURL}/api/suggestion", params=params)
        data = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertIn(data['suggestion'].lower(), ["yes", "no", "maybe"])
        self.assertTrue(len(data['description']) > 20)

    def test_people_at(self):
        # No model yet
        response = requests.get(f"{self.baseURL}/api/people-at", params=self.time)
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(int(response.text), int)

    def test_people_now(self):
        # No model yet
        response = requests.get(f"{self.baseURL}/api/people-now")
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(int(response.text), int)

    def test_average_people(self):
        response = requests.get(f"{self.baseURL}/api/average-people", params=self.time)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.text, "6")

    def test_min_people(self):
        response = requests.get(f"{self.baseURL}/api/min-people", params=self.time)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.text, "0")

    def test_max_people(self):
        """
        Test the max people endpoint with absolute value
        """
        params = {
            'time': 'Dawn'
        }
        response = requests.get(f"{self.baseURL}/api/max-people", params=params)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.text, "22")


if __name__ == "__main__":
    unittest.main()

