from seleniumpm.webelements.element import Element


class Clickable(Element):
    def __init__(self, driver, locator):
        super(Clickable, self).__init__(driver, locator)

    def click(self, checkVisibility=False):
        if checkVisibility:
            self.is_present_and_visible()
        self.driver.find_element(self.locator.by, self.locator.value).click()
        return self
