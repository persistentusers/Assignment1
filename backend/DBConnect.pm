package DBConnect;

use strict;
use warnings;
use DBI;  
use JSON;

use Exporter;
our @ISA = qw(Exporter);

my $dbh;

sub connect_db{
    my $driver = "mysql";  
    my $database = "apimonitoring";  
    my $dsn      = "dbi:$driver:database=$database";  
    my $user     = "root";  
    my $password = "123456789";  
    $dbh = DBI->connect($dsn, $user, $password) or die $DBI::errstr;  
    return $dbh;
}

sub insert_api_name{
    my $sth = $dbh->prepare("INSERT INTO ADDAPI (API_NAME) values (?)");
    my $rv=$sth->execute(@_);
            # or die $DBI::errstr;
    if(! defined $rv || $rv < 1) 
    {print "Faild insertion, Duplicate entry!";}
    else {print "1 Row added successfully.";}
    $sth->finish();
}

sub fetch_api_name{
    my $sth = $dbh->prepare("SELECT API_ID,API_NAME FROM ADDAPI");  
    $sth->execute() or die $DBI::errstr;  

    my @api_names;
    
    while (my @row = $sth->fetchrow_array()) {  
       my ($API_ID,$API_NAME) = @row;  

        push @api_names, {
            API_ID => $API_ID,
            API_NAME => $API_NAME
        };
    }  
    $sth->finish();
        my $json_response = JSON->new->encode(\@api_names);
        return $json_response; 
}


sub insert_api_url{
    my ($API_NAME, $API_URL) = @_;

    #Fetch API_ID based on API_NAME
    my $sth_select = $dbh->prepare("SELECT API_ID FROM ADDAPI WHERE API_NAME = ?");
    $sth_select->execute($API_NAME) or die $dbh->errstr;
    my ($API_ID) = $sth_select->fetchrow_array;
    $sth_select->finish();

    #Insert API_ID and API_URL into ADDAPI_URL table.
    my $sth_insert = $dbh->prepare("INSERT INTO ADDAPI_URL (API_ID,API_URL) values (?,?)");
    my $rv=$sth_insert->execute($API_ID,$API_URL) or die $dbh->errstr; 
    if(! defined $rv) {return 0;}
    else {return 1;}
    $sth_insert->finish();
}

sub fetch_api_url{
    my $sth = $dbh->prepare("SELECT URL_ID,API_ID,API_URL FROM ADDAPI_URL");  
    $sth->execute() or die $DBI::errstr;  
    my @api_url;
    while (my @row = $sth->fetchrow_array()) {  
       my ($URL_ID,$API_ID,$API_URL) = @row;   
       push @api_url, {
            URL_ID => $URL_ID,
            API_ID => $API_ID,
            API_URL => $API_URL
        };
    }  
    $sth->finish();
    my $json_response = JSON->new->encode(\@api_url);
    return $json_response;
}

sub insert_api_status{
    my $sth = $dbh->prepare("INSERT INTO ADDAPI_STATUS (URL_ID,URL_STATUS,RESPONSE_TIME) values ( ?,?,?)");
    my $rv=$sth->execute(@_) 
            or die $DBI::errstr;
    if(! defined $rv) {return 0;}
    else {return 1;}
    $sth->finish();
}

sub fetch_api_status{
    my ($API_NAME) = @_;
    
    #Fetch API_ID based on API_NAME
    my $sth_select = $dbh->prepare("SELECT API_ID FROM ADDAPI WHERE API_NAME = ?");  
    $sth_select->execute($API_NAME) or die $dbh->errstr; 
    my ($API_ID) = $sth_select->fetchrow_array;
    $sth_select->finish();

    #Fetch URL_ID based on API_ID
    my $sth_select_urlid = $dbh->prepare("SELECT MAX(URL_ID) FROM ADDAPI_URL WHERE API_ID = ?") ;
    $sth_select_urlid->execute($API_ID) or die $dbh->errstr; 
    my ($URL_ID) = $sth_select_urlid->fetchrow_array;
    $sth_select_urlid->finish();

    #Fetch RESPONSE_TIME based on URL_ID
    my $sth_select_responsetime = $dbh->prepare("SELECT RESPONSE_TIME FROM ADDAPI_STATUS WHERE STATUS_ID IN (SELECT MAX(STATUS_ID) FROM ADDAPI_STATUS WHERE URL_ID = ?)");
    $sth_select_responsetime->execute($URL_ID) or die $dbh->errstr; 
    my ($RESPONSE_TIME) = $sth_select_responsetime->fetchrow_array;    
    $sth_select_responsetime->finish();

    #Fetch Total_Pass based on URL_ID
    my $sth_select_pass = $dbh->prepare("SELECT COUNT(*) FROM ADDAPI_STATUS WHERE URL_ID = ? AND URL_STATUS = 1");
    $sth_select_pass->execute($URL_ID) or die $dbh->errstr; 
    my ($countp) = $sth_select_pass->fetchrow_array;    
    $sth_select_pass->finish();

    #Fetch Total_Fail based on URL_ID
    my $sth_select_fail = $dbh->prepare("SELECT COUNT(*) FROM ADDAPI_STATUS WHERE URL_ID = ? AND URL_STATUS = 0");
    $sth_select_fail->execute($URL_ID) or die $dbh->errstr; 
    my ($countf) = $sth_select_fail->fetchrow_array;
    $sth_select_fail->finish();

    my $total_count = $countp + $countf;

    my %api_status = (
            'Total Count' => $total_count,
            'Count Pass' => $countp,
            'Count Fail' => $countf,
            'RESPONSE_TIME' => $RESPONSE_TIME
    );

    my $json = encode_json \%api_status;
    return $json;
}

1;