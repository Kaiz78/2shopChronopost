<?php


// namespace ChronopostPickupPoint\Controller;


// use ChronopostPickupPoint\Config\ChronopostPickupPointConst;
// use Thelia\Controller\Admin\BaseAdminController;
// use Symfony\Component\Routing\Annotation\Route;



// var_dump(scandir(__DIR__.'/../Config/test.php'));die;
include __DIR__.'/../Config/ChronopostPickupPointConst.php';


/**
 * @Route("/admin/module/chronopost-pickup-point", name="chronopost-pickup-point")
 */
class ChronopostPickupPointRelayController
{
    public function __construct()
    {
    }

    const CHRONOPOST_PICKUP_POINT_CODE_CLIENT = "19869502";
    const CHRONOPOST_PICKUP_POINT_PASSWORD  = "255562";

    /**
     * @Route("/coordinates", name="_coordinates", methods="POST")
     */
    public function findByAddress($data)
    {
        
        if(!is_array($data)){
            throw new \Exception("Data must be an array.");
        }
        // $config = ChronopostPickupPointConst::getConfig();
       
        $datetime = new \DateTime('tomorrow');
        $tomorrow = $datetime->format('d/m/Y');

        /** START */

        /** SHIPPER INFORMATIONS */
        $APIData = [
            "accountNumber" => self::CHRONOPOST_PICKUP_POINT_CODE_CLIENT,
            "password" => self::CHRONOPOST_PICKUP_POINT_PASSWORD,
            "adress" => $data["adress"],
            "zipCode" => $data["zipCode"],
            "city" => $data["city"],
            "countryCode" => $data["countryCode"],
            "type" => $data["type"],
            "productCode" => $data["productCode"], 
            "service" => $data["service"],
            "weight" => $data["weight"],
            "shippingDate" => $data["shippingDate"],
            "maxPointChronopost" => $data["maxPointChronopost"],
            "maxDistanceSearch" => $data["maxDistanceSearch"],
            "holidayTolerant" => $data["holidayTolerant"],
            "language" => $data["language"],
            "version" => $data["version"],
        ];



        /** Send informations to the Chronopost API */
        try{
            $soapClient = new \SoapClient(ChronopostPickupPointConst::CHRONOPOST_PICKUP_POINT_RELAY_SEARCH_SERVICE_WSDL, array("trace" => 1, "exception" => 1));
            $response = $soapClient->__soapCall('recherchePointChronopostInter', [$APIData]);
            if (0 != $response->return->errorCode) {
                throw new \Exception($response->return->errorMessage);
            }

            return $response->return->listePointRelais;
        }catch(Exception $e){
            throw new \Exception($e->getMessage());
        }
        
    }
}
