const RemoveCard = ({removeFrom}) => {
    
   console.log(removeFrom);
  return (
    <div className="remove-card">
        <button>
            Yes remove 
        </button>
        <button>
            No! don't remove
        </button>
    </div>
  )
}

export default RemoveCard