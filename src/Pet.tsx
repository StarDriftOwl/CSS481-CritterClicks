import React, { useState, useEffect, useRef } from "react";
import "./pet.css";

interface PetAttributes {
  name: string;
  src: string;
  base: string;
  stage: number;
  hunger: number;
  happiness: number;
  thirst: number;
  lvl: number;
  xp: number;
  isAlive: boolean;
  hungerClicker: number;
  happinessClicker: number;
  thirstClicker: number;
}

const Pet: React.FC = () => {
  const [petName, setPetName] = useState<string>("");
  const [selectedPet, setSelectedPet] = useState<string>("Pictures/blank.png");
  const [coins, setCoins] = useState<number>(0);
  const [clickers, setClickers] = useState<number>(0);
  const [careType, setCareType] = useState<string>("food");
  const [items, setItems] = useState<string[]>([]);
  const [showError, setShowError] = useState<boolean>(false);
  const [showEvoError, setShowEvoError] = useState<boolean>(false);
  const [showItemError, setShowItemError] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<string>("gallery");
  const [activeStatsTab, setActiveStatsTab] = useState<string>("Stats");
  const [activeShopTab, setActiveShopTab] = useState<string>("Stage");
  const [petData, setPetData] = useState<PetAttributes | null>(null);
  const [displayName, setDisplayName] = useState<string>("");
  const [evolutionStatus, setEvolutionStatus] = useState<{
    text: string;
    src: string;
  }>({
    text: "Next evolution:",
    src: "Pictures/happycat.png",
  });
  const [shopItems, setShopItems] = useState({
    foodbowl: { src: "Pictures/foodbowl.png", available: true },
    waterbottle: { src: "Pictures/waterbottle.png", available: true },
    mousetoy: { src: "Pictures/mousetoy.png", available: true },
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const createPet = (name: string, src: string): PetAttributes => {
    const fullPath = src.includes("/") ? src : `Pictures/${src}`;
    const fileName = fullPath.split("/").pop() || "";

    const nameWithoutExt = fileName.replace(/\.(png|jpg|jpeg)$/, "");

    const lastChar = nameWithoutExt.charAt(nameWithoutExt.length - 1);
    const stage = parseInt(lastChar);

    const base = !isNaN(stage)
      ? nameWithoutExt.substring(0, nameWithoutExt.length - 1)
      : nameWithoutExt;

    console.log(
      `Pet creation: ${name}, src: ${src}, base: ${base}, stage: ${
        !isNaN(stage) ? stage : "fully evolved"
      }`
    );

    return {
      name,
      src,
      base,
      stage: isNaN(stage) ? NaN : stage,
      hunger: 100,
      happiness: 100,
      thirst: 100,
      lvl: 1,
      xp: 0,
      isAlive: true,
      hungerClicker: 0,
      happinessClicker: 0,
      thirstClicker: 0,
    };
  };

  const choosePet = (event: React.MouseEvent<HTMLImageElement>) => {
    const img = event.target as HTMLImageElement;
    setSelectedPet(img.src);
  };

  const handleNext = () => {
    if (selectedPet === "Pictures/blank.png" || petName === "") {
      setShowError(true);
      return;
    }

    setShowError(false);
    setCurrentView("game");
    setDisplayName(petName);

    const newPet = createPet(petName, selectedPet);
    setPetData(newPet);

    if (isNaN(newPet.stage)) {
      setEvolutionStatus({
        text: "Your pet is fully evolved!",
        src: "Pictures/happycat.png",
      });
    } else {
      const nextStage = `Pictures/${newPet.base}${newPet.stage + 1}.png`;
      setEvolutionStatus({
        text: "Next evolution:",
        src: nextStage,
      });
    }

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(incrementTime, 10000);
  };

  const incrementTime = () => {
    if (!petData) return;

    const updatedPet = { ...petData };
    updatedPet.xp += 100;

    if (updatedPet.xp >= 1000) {
      updatedPet.lvl += 1;
      updatedPet.xp = 0;
    }

    setCoins((prevCoins) => prevCoins + clickers + 1);
    updatedPet.hunger = Math.max(
      0,
      updatedPet.hunger + updatedPet.hungerClicker - 1
    );
    updatedPet.happiness = Math.max(
      0,
      updatedPet.happiness + updatedPet.happinessClicker - 1
    );
    updatedPet.thirst = Math.max(
      0,
      updatedPet.thirst + updatedPet.thirstClicker - 1
    );

    setPetData(updatedPet);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const addCoin = () => {
    if (!petData) return;

    const updatedPet = { ...petData };

    setCoins((prevCoins) => prevCoins + updatedPet.lvl);

    updatedPet.xp += 1;
    if (updatedPet.xp >= 1000) {
      updatedPet.lvl += 1;
      updatedPet.xp = 0;
    }

    switch (careType) {
      case "food":
        if (updatedPet.hunger < 100) updatedPet.hunger += 1;
        break;
      case "water":
        if (updatedPet.thirst < 100) updatedPet.thirst += 1;
        break;
      case "play":
        if (updatedPet.happiness < 100) updatedPet.happiness += 1;
        break;
    }

    setPetData(updatedPet);
  };

  const buyItem = (
    event: React.MouseEvent<HTMLImageElement>,
    purchase: keyof typeof shopItems
  ) => {
    if (coins >= 100) {
      setShowItemError(false);

      setShopItems((prev) => ({
        ...prev,
        [purchase]: {
          ...prev[purchase],
          available: false,
          src: "Pictures/soldout.png",
        },
      }));

      setClickers((prev) => prev + 1);

      if (petData) {
        const updatedPet = { ...petData };

        switch (purchase) {
          case "foodbowl":
            updatedPet.hungerClicker += 1;
            setItems((prev) => [...prev, "Food bowl"]);
            break;
          case "waterbottle":
            updatedPet.thirstClicker += 1;
            setItems((prev) => [...prev, "Water bottle"]);
            break;
          case "mousetoy":
            updatedPet.happinessClicker += 1;
            setItems((prev) => [...prev, "Mouse toy"]);
            break;
        }

        setPetData(updatedPet);
      }

      setCoins((prev) => prev - 100);
    } else {
      setShowItemError(true);
    }
  };

  const changeCare = (care: string) => {
    setCareType(care);
  };

  const evolve = () => {
    if (!petData) return;

    if (!isNaN(petData.stage) && coins < 100) {
      setShowEvoError(true);
    } else if (!isNaN(petData.stage)) {
      setShowEvoError(false);

      const nextStage = petData.stage + 1;
      const newSrc = `Pictures/${petData.base}${nextStage}.png`;

      console.log(`Evolving pet from ${petData.src} to ${newSrc}`);

      setEvolutionStatus({
        text: "Your pet is fully evolved!",
        src: "Pictures/happycat.png",
      });

      const updatedPet = {
        ...petData,
        src: newSrc,
        stage: nextStage,
        lvl: petData.lvl + 3,
      };
      setPetData(updatedPet);

      setSelectedPet(newSrc);

      setCoins((prev) => prev - 100);
    }
  };

  const changeStatsTabs = (
    event: React.MouseEvent<HTMLButtonElement>,
    tabName: string
  ) => {
    setActiveStatsTab(tabName);
  };

  const changeShopTabs = (
    event: React.MouseEvent<HTMLButtonElement>,
    tabName: string
  ) => {
    setActiveShopTab(tabName);
  };

  const returnToMainMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    window.open("./index.html", "_self");
    setPetData(null);
    setSelectedPet("Pictures/blank.png");
    setPetName("");
    setCoins(0);
    setClickers(0);
    setItems([]);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  return (
    <div className="game-container">
      <p className={`errmsg ${!showError ? "hide" : ""}`}>
        Please choose a pet and a petname!
      </p>
      <div className="flexContainer">
        <div className="flexContainerColumn">
          <div id="petDisplay">
            <img
              src={selectedPet}
              id="pet"
              alt="Selected pet"
              onClick={currentView === "game" ? addCoin : undefined}
            />
            <br />
            {currentView === "gallery" ? (
              <>
                <label htmlFor="namePicker">Pet Name:</label>
                <input
                  type="text"
                  id="namePicker"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                />
              </>
            ) : (
              <label>{displayName}</label>
            )}
          </div>
          <div
            className={`${currentView !== "game" ? "hide" : ""}`}
            id="bottomBar"
          >
            <button
              className={`stats tablinks ${
                activeStatsTab === "Stats" ? "activeTabLink" : ""
              }`}
              onClick={(e) => changeStatsTabs(e, "Stats")}
            >
              Stats
            </button>
            <button
              className={`stats tablinks ${
                activeStatsTab === "Levels" ? "activeTabLink" : ""
              }`}
              onClick={(e) => changeStatsTabs(e, "Levels")}
            >
              Levels
            </button>
            <button
              className={`stats tablinks ${
                activeStatsTab === "Bag" ? "activeTabLink" : ""
              }`}
              onClick={(e) => changeStatsTabs(e, "Bag")}
            >
              Bag
            </button>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <button
              id="food"
              className={`care ${careType === "food" ? "activeTabLink" : ""}`}
              onClick={() => changeCare("food")}
            >
              <img src="Pictures/food.png" alt="Food" />
            </button>
            <button
              id="water"
              className={`care ${careType === "water" ? "activeTabLink" : ""}`}
              onClick={() => changeCare("water")}
            >
              <img src="Pictures/water.png" alt="Water" />
            </button>
            <button
              id="play"
              className={`care ${careType === "play" ? "activeTabLink" : ""}`}
              onClick={() => changeCare("play")}
            >
              <img src="Pictures/ball.png" alt="Play" />
            </button>

            <div
              id="Stats"
              className={`stats tabcontent tab ${
                activeStatsTab !== "Stats" ? "hide" : ""
              }`}
            >
              <p>
                Coins: <span id="coins">{coins}</span>
              </p>
              <p>
                Clickers Active: <span id="clickerNo">{clickers}</span>
              </p>
              <p>
                Pet Level: <span id="petLvl">{petData?.lvl || 1}</span>
                &nbsp;&nbsp;&nbsp;&nbsp; Pet XP:
                <span id="xp">{petData?.xp || 0}</span>/1000
              </p>
            </div>

            <div
              id="Levels"
              className={`stats tabcontent tab ${
                activeStatsTab !== "Levels" ? "hide" : ""
              }`}
            >
              <p>
                Hunger: <span id="hunger">{petData?.hunger || 100}</span>/100
              </p>
              <p>
                Thirst: <span id="thirst">{petData?.thirst || 100}</span>/100
              </p>
              <p>
                Happiness:{" "}
                <span id="happiness">{petData?.happiness || 100}</span>/100
              </p>
            </div>

            <div
              id="Bag"
              className={`stats tabcontent tab ${
                activeStatsTab !== "Bag" ? "hide" : ""
              }`}
            >
              <p>
                Items: <span id="itemBag">{items.join(", ")}</span>
              </p>
            </div>
          </div>
        </div>

        <div
          id="gallery"
          className={`flexWrap tab ${currentView !== "gallery" ? "hide" : ""}`}
        >
          <img
            src="Pictures/ghostcat1.png"
            className="galleryCell"
            onClick={choosePet}
            alt="Ghost cat"
          />
          <img
            src="Pictures/placeholder.png"
            className="galleryCell"
            onClick={choosePet}
            alt="Placeholder pet"
          />
          <img
            src="Pictures/didoo.png"
            className="galleryCell"
            onClick={choosePet}
            alt="Didoo"
          />
          <img
            src="Pictures/scream.jpg"
            className="galleryCell"
            onClick={choosePet}
            alt="Scream"
          />
          <img
            src="Pictures/evilcat1.png"
            className="galleryCell"
            onClick={choosePet}
            alt="Evil Cat"
          />
        </div>

        <div className={`${currentView !== "game" ? "hide" : ""}`} id="shopTab">
          <button
            className={`shop tablinks ${
              activeShopTab === "Stage" ? "activeTabLink" : ""
            }`}
            onClick={(e) => changeShopTabs(e, "Stage")}
          >
            Stage
          </button>
          <button
            className={`shop tablinks ${
              activeShopTab === "Item Shop" ? "activeTabLink" : ""
            }`}
            onClick={(e) => changeShopTabs(e, "Item Shop")}
          >
            Item Shop
          </button>
          <button
            className={`shop tablinks ${
              activeShopTab === "Pet Shop" ? "activeTabLink" : ""
            }`}
            onClick={(e) => changeShopTabs(e, "Pet Shop")}
          >
            Pet Shop
          </button>
          <div
            id="Stage"
            className={`shop tabcontent tab ${
              activeShopTab !== "Stage" ? "hide" : ""
            }`}
          >
            <h1>{evolutionStatus.text}</h1>
            <img
              src={evolutionStatus.src}
              className="cell"
              onClick={evolve}
              alt="Evolution option"
            />
            <p>{!isNaN(petData?.stage || NaN) ? "Cost: 100 coins" : ""}</p>
            <p id="evoErr" className={`errmsg ${!showEvoError ? "hide" : ""}`}>
              You do not have enough coins to buy this!
            </p>
          </div>

          <div
            id="Item Shop"
            className={`shop tabcontent tab ${
              activeShopTab !== "Item Shop" ? "hide" : ""
            }`}
          >
            <div className="shopdisplay">
              <div className="shopCell">
                <img
                  src={shopItems.foodbowl.src}
                  className="cell"
                  onClick={
                    shopItems.foodbowl.available
                      ? (e) => buyItem(e, "foodbowl")
                      : undefined
                  }
                  alt="Food bowl"
                />
                <p>Cost: 100 coins</p>
              </div>
              <div className="shopCell">
                <img
                  src={shopItems.waterbottle.src}
                  className="cell"
                  onClick={
                    shopItems.waterbottle.available
                      ? (e) => buyItem(e, "waterbottle")
                      : undefined
                  }
                  alt="Water bottle"
                />
                <p>Cost: 100 coins</p>
              </div>
              <div className="shopCell">
                <img
                  src={shopItems.mousetoy.src}
                  className="cell"
                  onClick={
                    shopItems.mousetoy.available
                      ? (e) => buyItem(e, "mousetoy")
                      : undefined
                  }
                  alt="Mouse toy"
                />
                <p>Cost: 100 coins</p>
              </div>
            </div>
            <p
              id="itemErr"
              className={`errmsg ${!showItemError ? "hide" : ""}`}
            >
              You do not have enough coins to buy this!
            </p>
          </div>

          <div
            id="Pet Shop"
            className={`shop tabcontent tab ${
              activeShopTab !== "Pet Shop" ? "hide" : ""
            }`}
          >
            <div className="shopdisplay">
              <div className="shopCell">
                <img
                  src="Pictures/ghostcat1.png"
                  className="cell"
                  alt="Ghost cat"
                />
                <p>Cost: 100 coins</p>
              </div>
              <div className="shopCell">
                <img
                  src="Pictures/placeholder.png"
                  className="cell"
                  alt="Placeholder pet"
                />
                <p>Cost: 100 coins</p>
              </div>
              <div className="shopCell">
                <img src="Pictures/didoo.png" className="cell" alt="Didoo" />
                <p>Cost: 100 coins</p>
              </div>
              <div className="shopCell">
                <img src="Pictures/scream.jpg" className="cell" alt="Scream" />
                <p>Cost: 100 coins</p>
              </div>
              <div className="shopCell">
                <img
                  src="Pictures/evilcat1.png"
                  className="cell"
                  alt="Scream"
                />
                <p>Cost: 100 coins</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="button-container">
        {currentView === "game" && (
          <button id="main-menu" onClick={returnToMainMenu}>
            Main Menu
          </button>
        )}
        {currentView === "gallery" && (
          <button id="next" onClick={handleNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Pet;
