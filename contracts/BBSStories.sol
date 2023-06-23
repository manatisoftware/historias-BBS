// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/// @custom:security-contact jjmiranda@outlook.com
contract BBSStories is Initializable, PausableUpgradeable, AccessControlUpgradeable {
    
    struct StoryStruct{
        bytes32 story_name;
        address author;
        bool active;
        uint block_creation;
        uint index;
    }

    mapping(uint => StoryStruct) private storyStruct;
    uint private storyIndex = 0;

    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    string public name;

    //Evento para comunicar al mundo un nuevo parrafo
    event NewContent(uint256 indexed _story, address indexed _author, string _content);

    event LogNewStory   (uint indexed index, bytes32 story_name, address author, uint block_creation);
    event LogUpdateStory(uint indexed index);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() initializer public {
        name = "DApp Stories like BBS fashion";

        __Pausable_init();
        __AccessControl_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
    }

    function setContent(uint256 _story, string memory _content) external {
         emit NewContent(_story, msg.sender, _content);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

  
  function isStory(uint index)
    public 
    returns(bool isIndeed) 
  {
    if(storyIndex == 0) return false;
    return (storyStruct[index].index == index);
  }

  function insertStory(
    bytes32 story_name,
    address author) 
    public
    returns(uint index)
  {
    require(!isStory(storyIndex), "Ya existe un cuento con ese indice.");
    storyStruct[storyIndex].story_name     = story_name;
    storyStruct[storyIndex].author         = author;
    storyStruct[storyIndex].active         = true;
    storyStruct[storyIndex].block_creation = block_creation;
    storyStruct[storyIndex].index          = storyIndex;
    LogNewStory(
        storyIndex, 
        story_name, 
        author, 
        block_creation);
    index = storyIndex;
    storyIndex++;
    return index;
  }
  
  function getStory(uint index)
    public 
    returns(bytes32 story_name,
        address author,
        bool active,
        uint block_creation)
  {
    require(isStory(storyIndex), "El cuento con ese indice no existe.");
    return(
      storyStruct[index].story_name, 
      storyStruct[index].author, 
      storyStruct[index].active,
      storyStruct[index].block_creation);
  }
  
  function updateStoryName(uint index, bytes32 story_name) 
    public
    returns(bool success) 
  {
    require(isStory(storyIndex), "El cuento con ese indice no existe."); 
    storyStruct[index].story_name = story_name;
    LogUpdateStory(
      index);
    return true;
  }

  function getStoryCount() 
    public
    returns(uint count)
  {
    return storyIndex;
  }

}