const Filter =({value,onChange,title,name})=>(
<div>
        <label>
            {title}
        
          <input
            type="text"
            name={name}
            id="filter-name"
            value={value}
            onChange={onChange}
          />
        </label>
        
      </div>
)
export default Filter;