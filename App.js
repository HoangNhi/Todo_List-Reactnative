import React, { useState, useEffect } from "react";
import {
  Input,
  IconButton,
  Checkbox,
  Text,
  Box,
  VStack,
  HStack,
  Heading,
  Icon,
  Center,
  useToast,
  NativeBaseProvider,
  Button,
  ChevronUpIcon,
  Stagger,
  useDisclose,
} from "native-base";
import { Feather, Entypo } from "@expo/vector-icons";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
const Example = () => {
  const { isOpen, onToggle } = useDisclose();
  const createdAt = new Date();
  const currentTime = moment();
  const formattedTime = currentTime.format("dddd, MMMM D, YYYY");
  const instState = [
    {
      title: "Code",
      isCompleted: false,
      createdAt: "07:30:00 12/3/2023",
    },
    {
      title: "Đi làm",
      isCompleted: false,
      createdAt: "05:30:00 12/3/2023",
    },
    {
      title: "Check Emails",
      isCompleted: false,
      createdAt: "18:00:00 12/3/2023",
    },
    {
      title: "Tập thể dục",
      isCompleted: false,
      createdAt: createdAt.toLocaleString(),
    },
  ];

  const [list, setList] = React.useState(instState);
  const [complete, setComplete] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const toast = useToast();
  const [isIconRotated, setIsIconRotated] = useState(false);
  const formatNumber = (number) => `0${number}`.slice(-2);
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const hours = formatNumber(time.getHours());
  const minutes = formatNumber(time.getMinutes());
  const seconds = formatNumber(time.getSeconds());
  const ampm = hours >= 12 ? "PM" : "AM";
  const handleButtonPress = () => {
    setIsIconRotated(!isIconRotated);
    onToggle;
  };
  const addItem = (title) => {
    if (title === "") {
      toast.show({
        title: "Please Enter Text",
        status: "warning",
      });
      return;
    }
    setList((prevList) => {
      return [
        ...prevList,
        {
          title: title,
          isCompleted: false,
          createdAt: createdAt.toLocaleString(),
        },
      ];
    });
  };
  const handleDelete = (index) => {
    setList((prevList) => {
      const temp = prevList.filter((_, itemI) => itemI !== index);
      return temp;
    });
  };
  const handleDeleteReverse = (index) => {
    setComplete((prevList) => {
      const temp = prevList.filter((_, itemI) => itemI !== index);
      return temp;
    });
  };
  const handleStatusChange = (index) => {
    setList((prevList) => {
      const newList = [...prevList];
      newList[index].isCompleted = !newList[index].isCompleted;
      const completedItem = newList.splice(index, 1)[0];
      const newCompleteList = [...complete, completedItem];
      setComplete(newCompleteList);
      return newList;
    });
  };
  const handleStatusChangeReverse = (index) => {
    setComplete((prevList) => {
      const newList = [...prevList];
      newList[index].isCompleted = !newList[index].isCompleted;
      const ListItem = newList.splice(index, 1)[0];
      const newCompleteList = [...list, ListItem];
      setList(newCompleteList);
      return newList;
    });
  };
  return (
    <Center h="100%" w="100%">
      <Box
        bgColor={"white"}
        pt={30}
        pb={30}
        pl={50}
        pr={50}
        borderWidth={1}
        borderRadius={25}
        borderColor="amber.100"
        maxW="400"
        w="100%"
      >
        <Heading size="lg" mb={3}>
          <HStack space={8} alignItems="center">
            <VStack
              space={0}
              alignItems="center"
              justifyContent="center"
              flex={1}
              height={10}>
              <Text
                borderRightWidth={"3px"}
                borderColor={"#9796f0"}
                pr={5}
                fontSize={"1.4rem"}
                textAlign="center"
                fontFamily={"Microsoft JhengHei UI"}>
                Notes
              </Text>
            </VStack>
            <VStack space={0} height={-8}>
              <Text
                fontFamily={"Dubai Light, Century Gothic"}
                fontSize="1.5rem"
                textAlign="center"
                marginTop={-2}
                fontWeight="thin">
                {`${hours}:${minutes}:${seconds} ${ampm}`}
              </Text>
              <Text
                fontFamily={"Dubai Light, Century Gothic"}
                fontSize="1.2rem"
                textAlign="center"
                marginTop={-2}
                fontWeight="thin">
                {formattedTime}
              </Text>
            </VStack>
          </HStack>
        </Heading>

        <VStack space={4}>
          <HStack space={3}>
            <Input
              flex={1}
              onChangeText={(v) => setInputValue(v)}
              _hover={{ borderColor: "#9796f0" }}
              _focus={{ backgroundColor: "white" }}
              value={inputValue}
              placeholder="Add Task"
            />
            <IconButton
              accessibilityLabel="Add Task Button"
              borderRadius="sm"
              variant="solid"
              bgColor={"#9796f0"}
              icon={
                <Icon as={Feather} name="plus" size="sm" color="warmGray.50" />
              }
              onPress={() => {
                addItem(inputValue);
                setInputValue("");
              }}
            />
          </HStack>
          <VStack space={2}>
            {list.map((item, itemI) => (
              <HStack w="100%" justifyContent="space-between" alignItems="center" key={item.title + itemI.toString()}>
                <Checkbox isChecked={item.isCompleted} onChange={() => handleStatusChange(itemI)} value={item.title} />
                <Text width="100%" flexShrink={1} textAlign="left" mx="2" strikeThrough={item.isCompleted}
                  _light={{ color: item.isCompleted ? "gray.400" : "coolGray.800", }}
                  _dark={{ color: item.isCompleted ? "gray.400" : "coolGray.50", }}
                  onPress={() => handleStatusChange(itemI)}>
                  {item.title}
                </Text>
                <Text strikeThrough={item.isCompleted} onPress={() => handleStatusChange(itemI)} fontSize="xs" color="gray.400">
                  {item.createdAt}
                </Text>
                <IconButton size="sm" colorScheme="coolGray"
                  icon={<Icon as={Entypo} name="minus" size="xs" color="trueGray.400"/>}
                  onPress={() => handleDelete(itemI)}
                />
              </HStack>
            ))}
          </VStack>
          {complete.length > 0 ? (
            <VStack space={2}>
              <HStack w="100%" justifyContent="center">
                <Button onPress={handleButtonPress} width={"100%"} size="sm" variant="subtle" bg={"cyan.50"}
                  leftIcon={
                    <ChevronUpIcon color={"primary.600"} tyle={{
                        marginRight: 5,
                        transition: "transform 0.4s ease-in-out",
                        transform: isIconRotated ? [{ rotate: "180deg" }] : [],
                      }}
                    />
                  }
                >
                  <Text color={"primary.600"} fontWeight="bold">
                    Hoàn tất {complete.length}
                  </Text>
                </Button>
              </HStack>
              {isIconRotated && (
                <Stagger
                  visible={onToggle}
                  initial={{
                    opacity: 0,
                    scale: 0,
                    translateY: 34,
                  }}
                  animate={{
                    translateY: 0,
                    scale: 1,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      mass: 0.8,
                      delay: "2s", // thêm delay vào animate để làm chậm hiệu ứng
                      stagger: {
                        offset: 30,
                        reverse: true,
                      },
                    },
                  }}
                  exit={{
                    translateY: 34,
                    scale: 0.5,
                    opacity: 0,
                    transition: {
                      duration: 100,
                      delay: "2s", // thêm delay vào exit để làm chậm hiệu ứng
                      stagger: {
                        offset: 30,
                        reverse: true,
                      },
                    },
                  }}
                >
                  {complete.map((item, itemI) => (
                    <HStack w="100%" justifyContent="space-between" alignItems="center" key={item.title + itemI.toString()}>
                      <Checkbox isChecked={item.isCompleted} onChange={() => handleStatusChangeReverse(itemI)} value={item.title}
                        textAlign="left"
                      ></Checkbox>
                      <Text width="100%" flexShrink={1} textAlign="left" mx="2" strikeThrough={item.isCompleted}
                        _light={{ color: item.isCompleted ? "gray.400" : "coolGray.800", }}
                        _dark={{ color: item.isCompleted ? "gray.400" : "coolGray.50", }}
                        onPress={() => handleStatusChangeReverse(itemI)}
                      >
                        {item.title}
                      </Text>
                      <Text strikeThrough={item.isCompleted} onPress={() => handleStatusChangeReverse(itemI)} fontSize="xs" color="gray.400">
                        {item.createdAt}
                      </Text>
                      <IconButton size="sm" colorScheme="trueGray"
                        icon={
                          <Icon as={Entypo} name="minus" size="xs" color="trueGray.400"/>
                        }
                        onPress={() => handleDeleteReverse(itemI)}
                      />
                    </HStack>
                  ))}
                </Stagger>
              )}
            </VStack>
          ) : null}
        </VStack>
      </Box>
    </Center>
  );
};
export default () => {
  return (
    <LinearGradient
      colors={["#9796f0", "#fbc7d4"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <NativeBaseProvider>
        <Center flex={1}>
          <Example />
        </Center>
      </NativeBaseProvider>
    </LinearGradient>
  );
};
