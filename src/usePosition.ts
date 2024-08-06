export default function usePosition() {
    
    /**
     * Transform x, y, position into world space
     * Height is required to calculate the position by moving an elements origin to the bottom left corner
     * @param x 
     * @param y 
     * @param height 
     * @returns 
     */
    function getStyle(x: number, y: number, height: number, rotation?: number) {
        return {
            position: 'absolute',
            left: `${x}px`,
            top: `calc(100vh - ${y}px - ${height}px)`,
            transform: `rotate(${rotation ?? 0}deg)`,
        }
    }
    
    return {
        getStyle
    }
}