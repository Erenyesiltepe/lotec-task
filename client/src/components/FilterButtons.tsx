import type { FilterType } from '../types';

interface FilterButtonsProps {
    activeFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
}

export default function FilterButtons({ activeFilter, onFilterChange }: FilterButtonsProps) {
    return (
        <div className="filter-buttons">
            <button
                className={activeFilter === 'all' ? 'active' : ''}
                onClick={() => onFilterChange('all')}
            >
                All
            </button>
            <button
                className={activeFilter === 'active' ? 'active' : ''}
                onClick={() => onFilterChange('active')}
            >
                Active
            </button>
            <button
                className={activeFilter === 'completed' ? 'active' : ''}
                onClick={() => onFilterChange('completed')}
            >
                Completed
            </button>
        </div>
    );
}
