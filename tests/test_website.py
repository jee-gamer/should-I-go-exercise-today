import unittest
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import time
import math

# HEADLESS stuff
options = Options()
options.add_argument("--headless")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")


class SeleniumTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome(options=options)
        self.baseURL = "http://localhost:3000"
        self.driver.get(self.baseURL)
        self.driver.maximize_window()  # Makes the browser full screen
        self.actions = ActionChains(self.driver)

    def test_01_home_page(self):
        """
        Test that the home page have to show the suggestion based on the current time
        """
        driver = self.driver
        time.sleep(8)
        WebDriverWait(driver, 10).until(
            lambda d: d.execute_script(
                'return document.readyState') == 'complete'
        )
        WebDriverWait(driver, 10).until(
            lambda d: d.find_element(By.ID,
                                     "yesno").text != "hmm?"
        )
        suggestion = driver.find_element(by=By.ID, value='yesno').text.lower()

        self.assertIn(suggestion, ["yes", "no", "maybe"])

        current_time = driver.find_element(by=By.ID, value='currentTime').text.lower()
        self.assertEqual(current_time, "time - now")

        description = driver.find_element(by=By.ID,
                                          value='general').text.lower()

        print("🔥 PAGE SOURCE START 🔥")
        print(driver.page_source)
        print("🔥 PAGE SOURCE END 🔥")

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

    def test_03_home_page_api_button(self):
        driver = self.driver

        api_button = driver.find_element(by=By.ID, value="api")

        time.sleep(5)
        self.actions.click_and_hold(api_button).perform()

        time.sleep(2)
        self.actions.release().perform()

        time.sleep(3)
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
            "lat": "13.847",
            "lon": "100.568"
        }
        response = requests.get(f"{self.baseURL}/api/suggestion", params=params)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn(data['suggestion'].lower(), ["yes", "no", "maybe"])
        self.assertTrue(len(data['desc1']) > 20)
        self.assertTrue(len(data['desc2']) > 20)

    def test_people_at(self):
        response = requests.get(f"{self.baseURL}/api/people-at", params=self.time)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        people = int(data['prediction'])
        self.assertIsInstance(people, int)

    def test_people_now(self):
        response = requests.get(f"{self.baseURL}/api/people-now")
        self.assertEqual(response.status_code, [200, 204])  # 204 if it's outside of time range
        data = response.json()
        people = data['prediction']
        self.assertIsInstance(people, int)

    def test_average_people(self):
        response = requests.get(f"{self.baseURL}/api/average-people", params=self.time)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        people = math.floor(float(data['people']))
        self.assertEqual(math.floor(people), 8)  # round down from 8.84

    def test_min_people(self):
        response = requests.get(f"{self.baseURL}/api/min-people", params=self.time)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        people = int(data['people'])
        self.assertEqual(people, 3)

    def test_max_people(self):
        """
        Test the max people endpoint with absolute value
        """
        response = requests.get(f"{self.baseURL}/api/max-people", params=self.time)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        people = int(data['people'])
        self.assertEqual(people, 22)


if __name__ == "__main__":
    unittest.main()




