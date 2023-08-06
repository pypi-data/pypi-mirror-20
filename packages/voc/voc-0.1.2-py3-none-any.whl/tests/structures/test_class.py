from ..utils import TranspileTestCase


class ClassTests(TranspileTestCase):
    def test_minimal(self):
        self.assertCodeExecution("""
            class MyClass:
                pass

            obj = MyClass()
            """, run_in_function=False)

    def test_simple(self):
        self.assertCodeExecution("""
            class MyClass:
                def __init__(self, val):
                    print("VAL: ", val)
                    self.value = val

                def stuff(self, delta):
                    print("DELTA: ", delta)
                    return self.value + delta

            obj = MyClass(4)
            obj.stuff(5)
            """, run_in_function=False)

    def test_subclass_object(self):
        self.assertCodeExecution("""
            class MyClass(object):
                def __init__(self, val):
                    print("VAL: ", val)
                    self.value = val

                def stuff(self, delta):
                    print("DELTA: ", delta)
                    return self.value + delta

            obj = MyClass(4)
            obj.stuff(5)
            """, run_in_function=False)

    def test_method_override(self):
        self.assertCodeExecution("""
            class MyObject:
                def __init__(self, x):
                    self.x = x

                def __str__(self):
                    return "Myobject instance %s" % self.x

            obj = MyObject(37)

            print(obj)
            """, run_in_function=False)

    def test_subclass(self):
        self.assertCodeExecution("""
            class MyBase:
                def __init__(self, x):
                    self.x = x

                def __str__(self):
                    return "Mybase instance %s" % self.x

                def first(self):
                    return self.x * 2


            class MyObject(MyBase):
                def __init__(self, x, y):
                    super().__init__(x)
                    self.y = y

                def __str__(self):
                    return "Myobject instance %s, %s" % (self.x, self.y)

                def second(self):
                    return self.x * self.y

            obj = MyObject(37, 42)

            print(obj)
            print(obj.x)
            print(obj.first())
            print(obj.y)
            print(obj.second())
            """)

    def test_subclass_2_clause_super(self):
        self.assertCodeExecution("""
            class MyBase:
                def __init__(self, x):
                    self.x = x

                def __str__(self):
                    return "Mybase instance %s" % self.x

                def first(self):
                    return self.x * 2


            class MyObject(MyBase):
                def __init__(self, x, y):
                    super(MyObject, self).__init__(x)
                    self.y = y

                def __str__(self):
                    return "Myobject instance %s, %s" % (self.x, self.y)

                def second(self):
                    return self.x * self.y

            obj = MyObject(37, 42)

            print(obj)
            print(obj.x)
            print(obj.first())
            print(obj.y)
            print(obj.second())
            """)

    def test_redefine(self):
        self.assertCodeExecution("""
            class MyClass:
                def __init__(self, val):
                    print("VAL: ", val)
                    self.value = val

                def stuff(self, delta):
                    print("DELTA: ", delta)
                    return self.value + delta

                def stuff(self, delta):
                    print("Redefined DELTA: ", delta)
                    return self.value + delta * 2

            obj = MyClass(4)
            obj.stuff(5)
            """, run_in_function=False)
