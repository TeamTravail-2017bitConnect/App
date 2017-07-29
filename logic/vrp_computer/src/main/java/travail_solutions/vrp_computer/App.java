package travail_solutions.vrp_computer;

import java.util.ArrayList;
import java.util.List;

import com.graphhopper.jsprit.core.problem.Location;
import com.graphhopper.jsprit.core.problem.job.Shipment;
import com.graphhopper.jsprit.core.problem.solution.VehicleRoutingProblemSolution;
import com.graphhopper.jsprit.core.problem.vehicle.VehicleImpl;
import com.graphhopper.jsprit.core.problem.vehicle.VehicleImpl.Builder;
import com.graphhopper.jsprit.core.problem.vehicle.VehicleType;
import com.graphhopper.jsprit.core.problem.vehicle.VehicleTypeImpl;
import com.graphhopper.jsprit.core.reporting.SolutionPrinter;
import com.graphhopper.jsprit.core.reporting.SolutionPrinter.Print;
import com.graphhopper.jsprit.core.util.Coordinate;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
    	
    	// Define required lists
    	List<VehicleImpl> vehicleImpleList = new ArrayList<VehicleImpl>();
    	List<Shipment> shipmentList = new ArrayList<Shipment>();
    	
    	// ***********************
    	// *  Set vehicles       *
    	// ***********************
		VehicleTypeImpl.Builder vehicleTypeBuilder = VehicleTypeImpl.Builder.newInstance("vehicleType").addCapacityDimension(0, 4);
		VehicleType vehicleType = vehicleTypeBuilder.build();
    	
		Builder vehicleBuilder = VehicleImpl.Builder.newInstance("vehicle");
		vehicleBuilder.setStartLocation(loc(Coordinate.newInstance(10, 10)));
		vehicleBuilder.setType(vehicleType);
		vehicleImpleList.add(vehicleBuilder.build());
		

    	// ***********************
    	// *  Set shipment       *
    	// ***********************
		shipmentList.add(Shipment.Builder.newInstance("1").addSizeDimension(0, 1).setPickupLocation(loc(Coordinate.newInstance(5, 7))).setDeliveryLocation(loc(Coordinate.newInstance(6, 9))).build());
		shipmentList.add(Shipment.Builder.newInstance("2").addSizeDimension(0, 1).setPickupLocation(loc(Coordinate.newInstance(5, 13))).setDeliveryLocation(loc(Coordinate.newInstance(6, 11))).build());
		shipmentList.add(Shipment.Builder.newInstance("3").addSizeDimension(0, 1).setPickupLocation(loc(Coordinate.newInstance(15, 7))).setDeliveryLocation(loc(Coordinate.newInstance(14, 9))).build());
		shipmentList.add(Shipment.Builder.newInstance("4").addSizeDimension(0, 1).setPickupLocation(loc(Coordinate.newInstance(15, 13))).setDeliveryLocation(loc(Coordinate.newInstance(14, 11))).build());

		
    	// ***********************
    	// *  Solve problem      *
    	// ***********************
		VRPManager vRPManager = new VRPManager(vehicleImpleList, shipmentList);
		vRPManager.createProblem();
		vRPManager.solveProblem();
		vRPManager.printSol();
		
    	
    }
    
	private static Location loc(Coordinate coordinate) {
		return Location.Builder.newInstance().setCoordinate(coordinate).build();
	}
}
